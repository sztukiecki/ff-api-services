"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ff_aws_sdk_1 = require("ff-aws-sdk");
var HttpClient_1 = require("ff-api-services/lib/http/HttpClient");
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
var CognitoService = /** @class */ (function () {
    function CognitoService() {
        this.user = undefined;
        var stage = HttpClient_1.getStageFromStore();
        ff_aws_sdk_1.default.Config.setConfig(REGION, SETTINGS[stage].identityPoolId, SETTINGS[stage].userPoolId, SETTINGS[stage].clientId);
    }
    CognitoService.prototype.getValidSession = function () {
        var _this = this;
        var currentUser = ff_aws_sdk_1.default.Config.getUserPool().getCurrentUser();
        ff_aws_sdk_1.default.Config.credentials.loadCachedId();
        if (currentUser) {
            return currentUser.getSession().then(function (s) {
                _this.setNewLoginData(s.idToken.getJwtToken());
                return ff_aws_sdk_1.default.Config.credentials.get();
            });
        }
        return ff_aws_sdk_1.default.Config.credentials.get();
    };
    CognitoService.prototype.setNewLoginData = function (idToken) {
        var region = ff_aws_sdk_1.default.Config.getConfig().region;
        var userPoolId = ff_aws_sdk_1.default.Config.getConfig().userPoolID;
        var loginData = {
            key: "cognito-idp." + region + ".amazonaws.com/" + userPoolId,
            token: idToken
        };
        ff_aws_sdk_1.default.Config.credentials.setNewLoginData(loginData);
    };
    CognitoService.prototype.login = function (username, password) {
        var _this = this;
        this.user = new ff_aws_sdk_1.default.CognitoUser({
            username: username,
            pool: ff_aws_sdk_1.default.Config.getUserPool()
        });
        return new Promise(function (resolve, reject) {
            _this.user.authenticateUser({
                username: username,
                password: password
            }).then(function (result) {
                _this.setNewLoginData(result.idToken.jwtToken);
                ff_aws_sdk_1.default.Config.credentials.get(true).then(function (res) {
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
    };
    CognitoService.prototype.tryGetUser = function () {
        if (!this.user) {
            this.user = ff_aws_sdk_1.default.Config.getUserPool().getCurrentUser();
            if (!this.user) {
                return false;
            }
        }
        return true;
    };
    CognitoService.prototype.signOut = function () {
        var _this = this;
        if (!this.tryGetUser()) {
            return;
        }
        this.user.globalSignOut().then(function () {
            _this.user.signOut();
            ff_aws_sdk_1.default.Config.credentials.clear();
            _this.user = undefined;
        });
    };
    return CognitoService;
}());
exports.default = new CognitoService();
//# sourceMappingURL=CognitoService.js.map