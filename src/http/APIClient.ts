import AWS from '@flowfact/aws-sdk';
import axios, {AxiosError, AxiosRequestConfig, CancelToken} from 'axios';
import * as axiosRetry from 'axios-retry';

export type ParamMap = { [key: string]: string|true };

export interface AxiosConfig {
    'axios-retry': AxiosRetryConfig
}

export interface AxiosRetryConfig {
    retries?: number;
}

export interface APIClientConfig {
    url?: string;
    axios?: AxiosConfig;
}

export interface APIClientAdditionalParams {
    headers?: string | ParamMap;
    queryParams?: ParamMap;
    cancelToken?: CancelToken;
}

export default class APIClient {

    idToken = '';

    constructor(public config: APIClientConfig) {
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

    invokeApi = (path: string, method: string, additionsParams: APIClientAdditionalParams = {}, body: string|{} = '') => {
        if (!path.startsWith('/')) {
            throw new Error('missing slash at the beginning');
        }
        if (additionsParams === undefined) {
            additionsParams = {};
        }

        this.getidToken();

        // add parameters to the url
        let url = this.config.url + path;
        if (additionsParams.queryParams) {
            const queryString = this.buildCanonicalQueryString(additionsParams.queryParams);
            if (queryString !== '') {
                url += '?' + queryString;
            }
        }

        // setup the requst
        let request: AxiosRequestConfig = {
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
                    retryCondition: (error: AxiosError) => {
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

    buildCanonicalQueryString = (queryParams: ParamMap) => {
        if (!queryParams) {
            return '';
        }

        const sortedQueryParams = Object.getOwnPropertyNames(queryParams).sort();

        return sortedQueryParams.map(paramName => {
            const paramValue = queryParams[paramName];

            if (paramValue === true) {
                return encodeURIComponent(paramName)
            }

            return `${encodeURIComponent(paramName)}=${encodeURIComponent(paramValue)}`
        }).join('&');
    };
}
