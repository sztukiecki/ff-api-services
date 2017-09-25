"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ff_aws_sdk_1 = require("ff-aws-sdk");
var axios_1 = require("axios");
var axiosRetry = require("axios-retry");
var APIClient = /** @class */ (function () {
    function APIClient(config) {
        var _this = this;
        this.config = config;
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
        this.invokeApi = function (path, method, additionsParams, body) {
            if (additionsParams === void 0) { additionsParams = {}; }
            if (body === void 0) { body = ''; }
            if (!path.startsWith('/')) {
                throw new Error('missing slash at the beginning');
            }
            if (additionsParams === undefined) {
                additionsParams = {};
            }
            _this.getidToken();
            // add parameters to the url
            var url = _this.config.url + path;
            if (additionsParams.queryParams) {
                var queryString = _this.buildCanonicalQueryString(additionsParams.queryParams);
                if (queryString !== '') {
                    url += '?' + queryString;
                }
            }
            // setup the requst
            var request = {
                method: method,
                url: url,
                headers: Object.assign({}, {
                    cognitoToken: _this.idToken
                }, additionsParams.headers || {}),
                data: body,
                cancelToken: additionsParams.cancelToken
            };
            var client = axios_1.default.create();
            var axiosConfiguration = _this.config.axios;
            if (axiosConfiguration) {
                if (axiosConfiguration['axios-retry']) {
                    axiosRetry(client, {
                        retries: axiosConfiguration['axios-retry'].retries,
                        retryCondition: function (error) {
                            return Boolean(error && error.response && error.response.status >= 500);
                        }
                    });
                }
            }
            // fire the request
            // NEVER put a catch here because it prevents all other error handling
            // i.e. you can't handle a service returning an error (which is possibly expected)
            return client.request(request);
        };
        this.buildCanonicalQueryString = function (queryParams) {
            if (!queryParams) {
                return '';
            }
            var sortedQueryParams = Object.getOwnPropertyNames(queryParams).sort();
            return sortedQueryParams.map(function (paramName) {
                var paramValue = queryParams[paramName];
                if (paramValue === true) {
                    return encodeURIComponent(paramName);
                }
                return encodeURIComponent(paramName) + "=" + encodeURIComponent(paramValue);
            }).join('&');
        };
    }
    return APIClient;
}());
exports.default = APIClient;
//# sourceMappingURL=APIClient.js.map