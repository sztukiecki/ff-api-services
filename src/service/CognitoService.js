import AWS from '@flowfact/aws-sdk';
import {getStageFromStore} from '../http/HttpClient';


const REGION = 'eu-central-1';
const SETTINGS = {
    development: {
        identityPoolId: 'eu-central-1:079515e9-300a-42c6-b608-930f84fed704',
        userPoolId: 'eu-central-1_8kCTHzIgR',
        clientId: '4gql86evdegfa9otnpa30rf47i'
    },
    staging: {
        identityPoolId: 'eu-central-1:a344597d-b532-4b94-81ef-5d31bf56e504',
        userPoolId: 'eu-central-1_8R899yNNH',
        clientId: '7qpfm5e3625hrf5mpieph9cu2a'
    },
    production: {
        identityPoolId: 'eu-central-1:2b79058f-3250-492a-a7a8-91bb06911ae9',
        userPoolId: 'eu-central-1_RdHzlSKS0',
        clientId: '57brn8csff678o6aee3k1ia00n'
    }
};

class CognitoService {

    constructor() {
        this.user = undefined;

        let stage = getStageFromStore();
        if (stage === 'local') {
            stage = 'development';
        }
        AWS.Config.setConfig(REGION,
            SETTINGS[stage].identityPoolId,
            SETTINGS[stage].userPoolId,
            SETTINGS[stage].clientId);
    }

    getValidSession() {
        const currentUser = AWS.Config.getUserPool().getCurrentUser();
        AWS.Config.credentials.loadCachedId();
        if (currentUser) {
            return currentUser.getSession().then((s) => {
                    this.setNewLoginData(s.idToken.getJwtToken());
                    return AWS.Config.credentials.get();
                }
            );
        }
        return AWS.Config.credentials.get();
    }

    setNewLoginData(idToken) {
        let region = AWS.Config.getConfig().region;
        let userPoolId = AWS.Config.getConfig().userPoolID;
        const loginData = {
            key: `cognito-idp.${region}.amazonaws.com/${userPoolId}`,
            token: idToken
        };
        AWS.Config.credentials.setNewLoginData(loginData);
    }

    login(username, password) {
        this.user = new AWS.CognitoUser({
            username: username,
            pool: AWS.Config.getUserPool()
        });
        return new Promise((resolve, reject) => {
            this.user.authenticateUser({
                username: username,
                password: password
            }).then(result => {
                this.setNewLoginData(result.idToken.jwtToken);

                AWS.Config.credentials.get(true).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                });
            }).catch(error => {
                if (error.response) {
                    error.errorType = error.response.data.__type;
                }
                reject(error);
            });
        });
    }

    tryGetUser() {
        if (!this.user) {
            this.user = AWS.Config.getUserPool().getCurrentUser();
            if (!this.user) {
                return false;
            }
        }
        return true;
    }

    signOut() {
        if (!this.tryGetUser()) {
            return;
        }

        this.user.globalSignOut().then(() => {
            this.user.signOut();
            AWS.Config.credentials.clear();
            this.user = undefined;
        });
    }
}

export default new CognitoService();
