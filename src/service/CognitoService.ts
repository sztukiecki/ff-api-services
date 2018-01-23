import {getStageFromStore} from '../http/APIClient';
import {
    CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserSession
} from 'amazon-cognito-identity-js';
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

export interface TokenModel {
    idToken: string,
    accessToken: string,
    refreshToken: string,
    username: string
}

export class CognitoService {

    userPool: CognitoUserPool;
    cognitoUser: CognitoUser | null;

    constructor() {
        let stage = getStageFromStore();
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
                    resolve(result);
                },
                onFailure: (error) => {
                    reject(error);
                }
            });
        });
    }

    async loginFromCache() {
        const currentUser = this.userPool.getCurrentUser();
        if(!currentUser) {
            throw new Error('Could not get the current user.');
        }

        AWS.config.credentials.loadCacheId();
        currentUser.getSession(async (error: AWS.AWSError, session: CognitoUserSession) => {
            this.loginWithTokens({
                username: currentUser.getUsername(),
                idToken: session.getIdToken().getJwtToken(),
                refreshToken: session.getRefreshToken().getToken(),
                accessToken: session.getAccessToken().getJwtToken()
            });

            await AWS.config.credentials.getPromise();
        });
    }

    loginWithTokens(tokens: TokenModel) {
        const stage = getStageFromStore();

        // set the new tokens in the store
        const key = `CognitoIdentityServiceProvider.${SETTINGS[stage].ClientId}`;
        localStorage.setItem(`${key}.LastAuthUser`, tokens.username);
        localStorage.setItem(`${key}.${tokens.username}.idToken`, tokens.idToken);
        localStorage.setItem(`${key}.${tokens.username}.refreshToken`, tokens.refreshToken);
        localStorage.setItem(`${key}.${tokens.username}.accessToken`, tokens.accessToken);

        // define the new Logins
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: SETTINGS[stage].IdentityPoolId,
            Logins: {
                [`cognito-idp.${REGION}.amazonaws.com/${SETTINGS[stage].UserPoolId}`]: tokens.idToken
            }
        });

        return new Promise(async (resolve, reject) => {
            try {
                // refresh the information
                await AWS.config.credentials.getPromise();
                await AWS.config.credentials.refreshPromise();

                // get the session. If this is valid, than the login was successful.
                this.userPool!.getCurrentUser()!.getSession((error: Error, session: CognitoUserSession) => {
                    if(error) {
                        reject(error);
                    } else {
                        resolve();
                    }
                });
            } catch(error) {
                reject(error);
            }
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

            this.cognitoUser.getSession((error: Error, session: CognitoUserSession) => {
                if (error) {
                    reject(error);
                } else {
                    const stage: string = getStageFromStore();

                    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                        IdentityPoolId: SETTINGS[stage].IdentityPoolId,
                        Logins: {
                            [`cognito-idp-${REGION}.amazonaws.com/${SETTINGS[stage].UserPoolId}`]: session.getIdToken().getJwtToken()
                        }
                    });

                    resolve(this.cognitoUser);
                }
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
}

export default new CognitoService();
