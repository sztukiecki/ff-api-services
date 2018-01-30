import {
    CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserSession
} from 'amazon-cognito-identity-js';
import StageConfiguration from '../util/StageConfiguration';
import {AWSError} from "aws-sdk";
import {TokenModel} from "../../index";

const AWS = require('aws-sdk');

const REGION = 'eu-central-1';
const SETTINGS = {
    development: {
        IdentityPoolId: 'eu-central-1:079515e9-300a-42c6-b608-930f84fed704',
        UserPoolId: 'eu-central-1_8kCTHzIgR',
        ClientId: '4gql86evdegfa9otnpa30rf47i'
    },
    staging: {
        IdentityPoolId: 'eu-central-1:a344597d-b532-4b94-81ef-5d31bf56e504',
        UserPoolId: 'eu-central-1_8R899yNNH',
        ClientId: '7qpfm5e3625hrf5mpieph9cu2a'
    },
    production: {
        IdentityPoolId: 'eu-central-1:2b79058f-3250-492a-a7a8-91bb06911ae9',
        UserPoolId: 'eu-central-1_RdHzlSKS0',
        ClientId: '57brn8csff678o6aee3k1ia00n'
    }
};

let instance: any = null;

export class CognitoService {

    userPool: CognitoUserPool;
    cognitoUser: CognitoUser | null;

    constructor() {
        if (!instance) {
            instance = this;
        }

        let stage = StageConfiguration.getStageFromStore();
        if (stage === 'local') {
            stage = 'development';
        }

        AWS.config.update({
            region: REGION,
            credentials: new AWS.CognitoIdentityCredentials({
                IdentityPoolId: SETTINGS[stage].IdentityPoolId
            })
        });

        this.userPool = new CognitoUserPool({
            UserPoolId: SETTINGS[stage].UserPoolId,
            ClientId: SETTINGS[stage].ClientId
        });

        return instance;
    }

    /**
     * Login a user by his username and password.
     * @param {string} username
     * @param {string} password
     * @returns {Promise<any>}
     */
    login(username: string, password: string) {
        // create a new user object
        this.cognitoUser = new CognitoUser({
            Username: username,
            Pool: this.userPool
        });

        // return a promise because aws works just with callback
        return new Promise((resolve, reject) => {
            // authenticate the user
            this.cognitoUser!.authenticateUser(new AuthenticationDetails({
                Username: username,
                Password: password
            }), {
                onSuccess: (result) => {
                    // define the new Logins
                    AWS.config.credentials = this.getCognitoIdentityCredentials(result.getIdToken().getJwtToken());
                    resolve(result);
                },
                onFailure: (error) => {
                    reject(error);
                }
            });
        });
    }

    loginWithTokens(tokens: TokenModel) {
        const stage = StageConfiguration.getStageFromStore();
        // set the new tokens in the store
        const key = `CognitoIdentityServiceProvider.${SETTINGS[stage].ClientId}`;
        localStorage.setItem(`${key}.LastAuthUser`, tokens.username);
        localStorage.setItem(`${key}.${tokens.username}.idToken`, tokens.idToken);
        localStorage.setItem(`${key}.${tokens.username}.refreshToken`, tokens.refreshToken);
        localStorage.setItem(`${key}.${tokens.username}.accessToken`, tokens.accessToken);

        // define the new Logins
        AWS.config.credentials = this.getCognitoIdentityCredentials(tokens.idToken);

        return new Promise(async (resolve, reject) => {
            try {
                // refresh the information
                await AWS.config.credentials.getPromise();
                await AWS.config.credentials.refreshPromise();

                // get the session. If this is valid, than the login was successful.
                this.userPool!.getCurrentUser()!.getSession((error: Error, session: CognitoUserSession) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve();
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    refreshSession(session: CognitoUserSession): Promise<any> {
        return new Promise((resolve, reject) => {
            if (session.isValid()) {
                resolve('SESSION_IS_VALID');
                return;
            }

            // Check if the session need a refresh. isValid checks if the access and id tokens have not expired.
            this.cognitoUser!.refreshSession(session.getRefreshToken(), (refreshError: AWSError, refreshedSession: CognitoUserSession) => {
                if (refreshError) {
                    reject(refreshError);
                    return;
                }
                AWS.config.credentials = this.getCognitoIdentityCredentials(refreshedSession.getIdToken().getJwtToken());
            });
        });
    }

    /**
     * Logout the current logged in user
     * @returns {Promise<any>}
     */
    async logout() {
        const cognitoUser: CognitoUser | null = await this.getCurrentUser();
        if (cognitoUser == null) {
            throw new Error('The current user is not logged in.');
        }

        return new Promise((resolve, reject) => {
            cognitoUser.globalSignOut({
                onSuccess: (msg) => {
                    resolve(msg);
                },
                onFailure: (error) => {
                    reject(error);
                }
            });
        });
    }

    /**
     * Get the current user from the local storage.
     * This method refreshs the session if the cognitoToken is expired!
     * @returns {Promise<any>}
     */
    getCurrentUser(): Promise<CognitoUser | null> {
        if (!this.userPool) {
            throw new Error('The userPool Object is not defined. This shouldn\'t happen.');
        }

        return new Promise((resolve, reject) => {
            this.cognitoUser = this.userPool.getCurrentUser();
            if (!this.cognitoUser) {
                reject('Could not get the current user.');
                return;
            }

            this.cognitoUser.getSession(async (error: Error, session: CognitoUserSession) => {
                if (error) {
                    reject(error);
                    return;
                }

                await this.refreshSession(session);
                AWS.config.credentials = this.getCognitoIdentityCredentials(session.getIdToken().getJwtToken());
                resolve(this.cognitoUser);
            });
        })
    }

    /**
     * Get the current cognito token (JWT Token)
     * @returns {string}
     */
    async getCognitoToken(): Promise<any> {
        const currentUser: CognitoUser | null = await this.getCurrentUser();
        return new Promise((resolve, reject) => {
            if (currentUser == null) {
                reject('currentUser is null');
                return;
            }

            currentUser.getSession((error: Error, session: CognitoUserSession) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(session!.getIdToken()!.getJwtToken());
                }
            });
        });
    }

    getCognitoIdentityCredentials(idToken: string): AWS.CognitoIdentityCredentials {
        const stage: string = StageConfiguration.getStageFromStore();
        return new AWS.CognitoIdentityCredentials({
            IdentityPoolId: SETTINGS[stage].IdentityPoolId,
            Logins: {
                [`cognito-idp.${REGION}.amazonaws.com/${SETTINGS[stage].UserPoolId}`]: idToken
            }
        });
    }
}

export default new CognitoService();
