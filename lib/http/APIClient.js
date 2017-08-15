function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import AWS from 'ff-aws-sdk';
import axios from 'axios';
import axiosRetry from 'axios-retry';

var APIClient = function APIClient(config) {
    var _this = this;

    _classCallCheck(this, APIClient);

    this.idToken = '';

    this.getidToken = function () {
        if (AWS.Config.credentials && AWS.Config.credentials.params && AWS.Config.credentials.params.Logins) {
            var loginKeys = Object.keys(AWS.Config.credentials.params.Logins);
            if (loginKeys.length > 0) {
                _this.idToken = AWS.Config.credentials.params.Logins[loginKeys[0]];
            }
        }

        if (!_this.idToken || _this.idToken && _this.idToken.trim().length === 0) {
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

        // add parameters to the url
        var url = _this.config.url + path;
        var queryString = _this.buildCanonicalQueryString(additionsParams.queryParams);
        if (queryString !== '') {
            url += '?' + queryString;
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

        var client = axios.create();

        var axiosConfiguration = _this.config.axios;
        if (axiosConfiguration) {
            if (axiosConfiguration['axios-retry']) {
                axiosRetry(client, {
                    retries: axiosConfiguration['axios-retry'].retries,
                    retryCondition: function retryCondition(error) {
                        return error && error.response && error.response.status >= 500;
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
            return queryParams[paramName] === true ? encodeURIComponent(paramName) : encodeURIComponent(paramName) + '=' + encodeURIComponent(queryParams[paramName]);
        }).join('&');
    };

    this.config = config;
};

export { APIClient as default };