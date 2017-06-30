function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import AWS from 'ff-aws-sdk';
import axios from 'axios';
import axiosRetry from 'axios-retry';

axiosRetry(axios, {
    retries: 5, retryCondition: function retryCondition(error) {
        return error && error.response && error.response.status >= 500;
    }
});

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

        return axios(request).then(function (response) {
            return response;
        }).catch(function (error) {
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

        return sortedQueryParams.map(function (paramName) {
            return queryParams[paramName] === true ? encodeURIComponent(paramName) : encodeURIComponent(paramName) + '=' + encodeURIComponent(queryParams[paramName]);
        }).join('&');
    };

    this.config = config;
};

export { APIClient as default };