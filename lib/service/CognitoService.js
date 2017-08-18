var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import AWS from 'ff-aws-sdk';
import { getStageFromStore } from 'ff-api-services/lib/http/HttpClient';

var REGION = 'eu-central-1';
var SETTINGS = {
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

var CognitoService = function () {
    function CognitoService() {
        _classCallCheck(this, CognitoService);

        this.user = undefined;

        var stage = getStageFromStore();
        AWS.Config.setConfig(REGION, SETTINGS[stage].identityPoolId, SETTINGS[stage].userPoolId, SETTINGS[stage].clientId);
    }

    _createClass(CognitoService, [{
        key: 'getValidSession',
        value: function getValidSession() {
            var _this = this;

            var currentUser = AWS.Config.getUserPool().getCurrentUser();
            AWS.Config.credentials.loadCachedId();
            if (currentUser) {
                return currentUser.getSession().then(function (s) {
                    _this.setNewLoginData(s.idToken.getJwtToken());
                    return AWS.Config.credentials.get();
                });
            }
            return AWS.Config.credentials.get();
        }
    }, {
        key: 'setNewLoginData',
        value: function setNewLoginData(idToken) {
            var region = AWS.Config.getConfig().region;
            var userPoolId = AWS.Config.getConfig().userPoolID;
            var loginData = {
                key: 'cognito-idp.' + region + '.amazonaws.com/' + userPoolId,
                token: idToken
            };
            AWS.Config.credentials.setNewLoginData(loginData);
        }
    }, {
        key: 'login',
        value: function login(username, password) {
            var _this2 = this;

            this.user = new AWS.CognitoUser({
                username: username,
                pool: AWS.Config.getUserPool()
            });
            return new Promise(function (resolve, reject) {
                _this2.user.authenticateUser({
                    username: username,
                    password: password
                }).then(function (result) {
                    _this2.setNewLoginData(result.idToken.jwtToken);

                    AWS.Config.credentials.get(true).then(function (res) {
                        resolve(res);
                    }).catch(function (err) {
                        reject(err);
                    });
                }).catch(function (error) {
                    if (error.response) {
                        error.errorType = error.response.data.__type;
                    }
                    reject(error);
                });
            });
        }
    }, {
        key: 'tryGetUser',
        value: function tryGetUser() {
            if (!this.user) {
                this.user = AWS.Config.getUserPool().getCurrentUser();
                if (!this.user) {
                    return false;
                }
            }
            return true;
        }
    }, {
        key: 'signOut',
        value: function signOut() {
            var _this3 = this;

            if (!this.tryGetUser()) {
                return;
            }

            this.user.globalSignOut().then(function () {
                _this3.user.signOut();
                AWS.Config.credentials.clear();
                _this3.user = undefined;
            });
        }
    }]);

    return CognitoService;
}();

export default new CognitoService();