import AWS from 'ff-aws-sdk';
import axios from 'axios';
import axiosRetry from 'axios-retry';

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

        // add parameters to the url
        let url = this.config.url + path;
        const queryString = this.buildCanonicalQueryString(additionsParams.queryParams);
        if (queryString !== '') {
            url += '?' + queryString;
        }

        // setup the requst
        let request = {
            method: method,
            url: url,
            headers: Object.assign({}, {
                cognitoToken: this.idToken
            }, additionsParams.headers || {}),
            data: body,
            cancelToken: additionsParams.cancelToken
        };

        const client = axios.create();

        const axiosConfiguration = this.config.axios;
        if (axiosConfiguration) {
            if (axiosConfiguration['axios-retry']) {
                axiosRetry(client, {
                    retries: axiosConfiguration['axios-retry'].retries,
                    retryCondition: (error) => {
                        return error && error.response && error.response.status >= 500;
                    }
                });
            }
        }

        // fire the request
        return client.request(request);
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
