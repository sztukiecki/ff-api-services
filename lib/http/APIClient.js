"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ff_aws_sdk_1 = require("ff-aws-sdk");
var axios_1 = require("axios");
var axiosRetry = require("axios-retry");
var ErrorHandler_1 = require("../ErrorHandler");
axiosRetry(axios_1.default, {
    retries: 5, retryCondition: function (error) {
        return error && error.response && error.response.status >= 500;
    }
});
var APIClient = (function () {
    function APIClient(config) {
        var _this = this;
        this.idToken = '';
        this.getidToken = function () {
            if (ff_aws_sdk_1.default.Config.credentials && ff_aws_sdk_1.default.Config.credentials.params && ff_aws_sdk_1.default.Config.credentials.params.Logins) {
                var loginKeys = Object.keys(ff_aws_sdk_1.default.Config.credentials.params.Logins);
                if (loginKeys.length > 0) {
                    _this.idToken = ff_aws_sdk_1.default.Config.credentials.params.Logins[loginKeys[0]];
                }
            }
            if (!_this.idToken || (_this.idToken && _this.idToken.trim().length === 0)) {
                console.warn('no id token is set');
            }
        };
        this.invokeApi = function (params, path, method, additionsParams, body) {
            if (!path.startsWith('/')) {
                throw new Error('missing slash at the beginning');
            }
            if (additionsParams === undefined) {
                additionsParams = {};
            }
            _this.getidToken();
            var url = _this.config.url + path;
            var queryString = _this.buildCanonicalQueryString(additionsParams.queryParams);
            if (queryString !== '') {
                url += '?' + queryString;
            }
            var request = {
                method: method,
                url: url,
                headers: Object.assign({}, {
                    cognitoToken: _this.idToken
                }, additionsParams.headers || {}),
                data: body,
                cancelToken: additionsParams.cancelToken
            };
            return axios_1.default(request).then(function (response) {
                return response;
            }).catch(function (error) {
                var responseCode = error.response ? error.response.status : undefined;
                ErrorHandler_1.default.handleError(responseCode, error.message);
                if (error.response) {
                    return error.response;
                }
            });
        };
        this.buildCanonicalQueryString = function (queryParams) {
            if (!queryParams) {
                return '';
            }
            var sortedQueryParams = Object.getOwnPropertyNames(queryParams).sort();
            return sortedQueryParams.map(function (paramName) { return queryParams[paramName] === true
                ? encodeURIComponent(paramName)
                : encodeURIComponent(paramName) + "=" + encodeURIComponent(queryParams[paramName]); }).join('&');
        };
        this.config = config;
    }
    return APIClient;
}());
exports.default = APIClient;
//# sourceMappingURL=APIClient.js.map