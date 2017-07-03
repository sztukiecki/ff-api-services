import AWS from 'ff-aws-sdk';
import axios from 'axios';
import * as axiosRetry from 'axios-retry';
import ErrorHandler from '../ErrorHandler';

axiosRetry(axios, {
    retries: 5, retryCondition: (error) => {
        return error && error.response && error.response.status >= 500;

    }
});

export default class APIClient {

    idToken = '';

    constructor(config) {
        this.config = config;

    }

    getidToken = () => {
        if (AWS.Config.credentials && AWS.Config.credentials.params && AWS.Config.credentials.params.Logins) {
            const loginKeys = Object.keys(AWS.Config.credentials.params.Logins);
            if (loginKeys.length > 0) {
                this.idToken = AWS.Config.credentials.params.Logins[loginKeys[0]];
            }
        }

        if (!this.idToken || (this.idToken && this.idToken.trim().length === 0)) {
            console.warn('no id token is set');
        }
    };

    invokeApi = (params, path, method, additionsParams, body) => {
        if (!path.startsWith('/')) {
            throw new Error('missing slash at the beginning');
        }
        if (additionsParams === undefined) {
            additionsParams = {};
        }

        this.getidToken();
        let url = this.config.url + path;
        const queryString = this.buildCanonicalQueryString(additionsParams.queryParams);
        if (queryString !== '') {
            url += '?' + queryString;
        }

        const request = {
            method: method,
            url: url,
            headers: Object.assign({}, {
                cognitoToken: this.idToken
            }, additionsParams.headers || {}),
            data: body,
            cancelToken: additionsParams.cancelToken
        };

        return axios(request).then(response => {
            return response;
        }).catch(error => {
            const responseCode = error.response ? error.response.status : undefined;
            ErrorHandler.handleError(responseCode, error.message);

            if(error.response) {
                return error.response;
            }
        });
    };

    buildCanonicalQueryString = (queryParams) => {
        if (!queryParams) {
            return '';
        }

        const sortedQueryParams = Object.getOwnPropertyNames(queryParams).sort();

        return sortedQueryParams.map(
            paramName => queryParams[paramName] === true
                ? encodeURIComponent(paramName)
                : `${encodeURIComponent(paramName)}=${encodeURIComponent(queryParams[paramName])}`
        ).join('&');
    };
}
