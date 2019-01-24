import {
    AuthenticationDetails,
    CognitoUser,
    CognitoUserAttribute,
    CognitoUserPool,
    CognitoUserSession
} from 'amazon-cognito-identity-js';
import StageConfiguration from '../util/StageConfiguration';

export interface TokenModel {
    idToken: string;
    accessToken: string;
    refreshToken: string;
    username: string;
}

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
    public token: { [key: string]: string };

    constructor() {
        if (!instance) {
            instance = this;
        }

        let stage = StageConfiguration.getStageFromStore();
        if (stage === 'local') {
            stage = 'development';
        }

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
            }),                                {
                onSuccess: (result) => {
                    // define the new Logins
                    this.token = this.buildLoginToken(result.getIdToken().getJwtToken());
                    resolve(result);
                },
                onFailure: (error) => {
                    reject(error);
                }
            });
        });
    }

    loginWithTokens(tokens: TokenModel) {
        let stage = StageConfiguration.getStageFromStore();
        if (stage === 'local') {
            stage = 'development';
        }

        // set the new tokens in the store
        const key = `CognitoIdentityServiceProvider.${SETTINGS[stage].ClientId}`;
        localStorage.setItem(`${key}.LastAuthUser`, tokens.username);
        localStorage.setItem(`${key}.${tokens.username}.idToken`, tokens.idToken);
        localStorage.setItem(`${key}.${tokens.username}.refreshToken`, tokens.refreshToken);
        localStorage.setItem(`${key}.${tokens.username}.accessToken`, tokens.accessToken);

        this.token = this.buildLoginToken(tokens.idToken);

        return new Promise(async (resolve, reject) => {
            try {
                // refresh the information

                this.userPool = new CognitoUserPool({
                    UserPoolId: SETTINGS[stage].UserPoolId,
                    ClientId: SETTINGS[stage].ClientId
                });

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

    checkUsername(username: string) {
        const cognitoUser = new CognitoUser({
            Username: username,
            Pool: this.userPool
        });

        return new Promise((resolve, reject) => {
            cognitoUser.authenticateUser(new AuthenticationDetails({
                Username: username,
                Password: ''
            }),                          {
                onSuccess: () => {
                    resolve();
                },
                onFailure: (error) => {
                    if (error.response) {
                        error.errorType = error.response.data.__type;
                    }
                    reject(error);
                }
            });
        });
    }

    signUp(username: string, password: string, email: string) {
        return new Promise((resolve, reject) => {
            const emailAttribute = {
                Name: 'email',
                Value: email
            };

            return this.userPool.signUp(username, password, [new CognitoUserAttribute(emailAttribute)], [], (error, result) => {
                if (error) {
                    return reject(error);
                }

                if (result) {
                    this.cognitoUser = result.user;
                    return resolve(result);
                }
            });
        });
    }

    forgotPassword(username?: string) {
        return new Promise(async (resolve, reject) => {
            if (username) {
                this.cognitoUser = new CognitoUser({
                    Username: username,
                    Pool: this.userPool
                });
            } else {
                const cognitoUser: CognitoUser | null = await this.getCurrentUser();
                if (!cognitoUser) {
                    reject('Could not get the current user');
                }
            }
            if (!this.cognitoUser) {
                return reject('Cognito user is not present');
            }

            this.cognitoUser.forgotPassword({
                onSuccess: (data) => {
                    resolve(data);
                },
                onFailure: (error: Error) => {
                    // tslint:disable-next-line:no-console
                    console.error(error);
                    reject(error);
                }
            });
        });
    }

    refreshSession(session: CognitoUserSession): Promise<any> {
        return new Promise((resolve, reject) => {
            if (session.isValid()) {
                this.token = this.buildLoginToken(session.getIdToken().getJwtToken());
                resolve('SESSION_IS_VALID');
                return;
            }

            // Check if the session need a refresh. isValid checks if the access and id tokens have not expired.
            this.cognitoUser!.refreshSession(session.getRefreshToken(), (refreshError: any, refreshedSession: CognitoUserSession) => {
                if (refreshError) {
                    reject(refreshError);
                    return;
                }
                this.token = this.buildLoginToken(refreshedSession.getIdToken().getJwtToken());
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
                    this.token = {};
                    resolve(msg);
                },
                onFailure: (error) => {
                    reject(error);
                }
            });
        });
    }

    async changePassword(oldPassword: string, newPassword: string) {
        let cognitoUser: CognitoUser | null = this.cognitoUser;
        if (!cognitoUser) {
            cognitoUser = await this.getCurrentUser();
        }

        if (!cognitoUser) {
            return;
        }

        return new Promise((resolve, reject) => {
            cognitoUser!.getSession((error?: Error) => {
                if (!error && cognitoUser) {
                    return cognitoUser.changePassword(oldPassword, newPassword, (_error) => {
                        if (_error) {
                            reject(_error);
                            return;
                        }
                        resolve(true);
                    });
                }
                resolve(false);
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
                resolve(this.cognitoUser);
            });
        });
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

    buildLoginToken(idToken: string): { [key: string]: string } {
        let stage: string = StageConfiguration.getStageFromStore();
        if (stage === 'local') {
            stage = 'development';
        }
        return {
            [`cognito-idp.${REGION}.amazonaws.com/${SETTINGS[stage].UserPoolId}`]: idToken
        };
    }

    resendConfirmationCode() {
        return new Promise((resolve, reject) => {
            if (this.cognitoUser) {
                this.cognitoUser.resendConfirmationCode((error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result);
                });
            } else {
                reject();
            }
        });
    }

    confirmRegistration(code: string, username?: string) {
        return new Promise(async (resolve, reject) => {
            if (username) {
                this.cognitoUser = new CognitoUser({
                    Username: username,
                    Pool: this.userPool
                });
            } else if (!this.cognitoUser) {
                this.cognitoUser = await this.getCurrentUser();
            }

            if (this.cognitoUser) {
                this.cognitoUser.confirmRegistration(code, true, (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result);
                });
            } else {
                reject();
            }
        });
    }

    confirmPassword(code: string, password: string) {
        return new Promise(async (resolve, reject) => {
            if (!this.cognitoUser) {
                this.cognitoUser = await this.getCurrentUser();
            }

            if (!this.cognitoUser) {
                reject();
                return;
            }

            this.cognitoUser.confirmPassword(code, password, {
                onSuccess: () => {
                    resolve();
                },
                onFailure: (error: Error) => {
                    reject(error);
                }
            });
        });
    }

    confirmEmail(code: string, username: string) {
        return new Promise(async (resolve, reject) => {
            if (username) {
                this.cognitoUser = new CognitoUser({
                    Username: username,
                    Pool: this.userPool
                });
            } else if (!this.cognitoUser) {
                this.cognitoUser = await this.getCurrentUser();
            }

            if (this.cognitoUser) {
                this.cognitoUser.verifyAttribute('email', code, {
                    onSuccess: (success) => {
                        resolve(success);
                    },
                    onFailure: (error) => {
                        reject(error);
                    }
                });
            } else {
                reject();
            }
        });
    }

    setCognitoUser(username: string) {
        this.cognitoUser = new CognitoUser({
            Username: username,
            Pool: this.userPool
        });
    }
}

export default new CognitoService();
