import AWS from 'ff-aws-sdk';
import axios, {AxiosError, AxiosRequestConfig, CancelToken} from 'axios';
import * as axiosRetry from 'axios-retry';
import ErrorHandler from '../ErrorHandler';

axiosRetry(axios, {
    retries: 5, retryCondition: (error: AxiosError): boolean => {
        return !!error && !!error.response && error.response.status >= 500;
    }
});

type ParamMap = { [key: string]: string|true };

export interface APIClientConfig {
    url?: string;
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
        let url = this.config.url + path;
        if (additionsParams.queryParams) {
            const queryString = this.buildCanonicalQueryString(additionsParams.queryParams);
            if (queryString !== '') {
                url += '?' + queryString;
            }
        }

        const request: AxiosRequestConfig = {
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
