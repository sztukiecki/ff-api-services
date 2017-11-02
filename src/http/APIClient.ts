import AWS from '@flowfact/aws-sdk';
import axios, {AxiosError, AxiosRequestConfig, CancelToken} from 'axios';
import * as axiosRetry from 'axios-retry';

import * as store from 'store';

const StoreKeys = {
    EdgeServiceStage: 'HTTPCLIENT.APICLIENT.STAGE',
    EdgeServiceVersionTag: 'HTTPCLIENT.APICLIENT.VERSIONTAG'
};

const defaultStage = 'production';
const defaultVersionTag = 'stable';

const getStageFromStore = () => {
    const fromStore = store.get(StoreKeys.EdgeServiceStage);
    return fromStore ? fromStore : defaultStage;
};

const getVersionTagFromStore = () => {
    const fromStore = store.get(StoreKeys.EdgeServiceVersionTag);
    return fromStore ? fromStore : defaultVersionTag;
};

const setStageInStore = (stage: string) => {
    if (stage) {
        store.set(StoreKeys.EdgeServiceStage, stage);
        console.log('Set stage to: ' + stage);
    }
};

const setVersionTagInStore = (versionTag: string) => {
    if (versionTag) {
        store.set(StoreKeys.EdgeServiceVersionTag, versionTag);
        console.log('Set versionTag to: ' + versionTag);
    }
};

const isDefaultApi = () => {
    return (getStageFromStore() === defaultStage) && (getVersionTagFromStore() === defaultVersionTag);
};

export type ParamMap = { [key: string]: string|boolean };

export interface AxiosConfig {
    'axios-retry': AxiosRetryConfig
}

export interface AxiosRetryConfig {
    retries?: number;
}

export interface APIClientConfig {
    serviceName?: string;
    axios?: AxiosConfig;
}

export interface APIClientAdditionalParams {
    headers?: string | ParamMap;
    queryParams?: ParamMap;
    cancelToken?: CancelToken;
}

export default class APIClient {

    idToken = '';

    stageToUse: string;
    apiVersionTag: string;

    constructor(public config: APIClientConfig) {
        this.stageToUse = getStageFromStore();
        this.apiVersionTag = getVersionTagFromStore();
    }

    getidToken() {
        if (AWS.Config.credentials && AWS.Config.credentials.params && AWS.Config.credentials.params.Logins) {
            const loginKeys = Object.keys(AWS.Config.credentials.params.Logins);
            if (loginKeys.length > 0) {
                this.idToken = AWS.Config.credentials.params.Logins[loginKeys[0]];
            }
        }

        if (!this.idToken || (this.idToken && this.idToken.trim().length === 0)) {
            console.warn('no id token is set');
        }
    }

    private async buildAPIUrl() {
        const account = this.stageToUse === 'development' ? 'flowfact-dev' : 'flowfact-prod';
        const baseUrl = this.stageToUse === 'local'
            ? 'http://localhost:8080'
            : `https://api.${this.stageToUse}.cloudios.${account}.cloud`;
        return `${baseUrl}/${this.config.serviceName}/${this.apiVersionTag}`;
    };

    public async invokeApi (path: string, method: string, additionsParams: APIClientAdditionalParams = {}, body: string|{} = '') {
        if (!path.startsWith('/')) {
            throw new Error('missing slash at the beginning');
        }
        if (additionsParams === undefined) {
            additionsParams = {};
        }

        this.getidToken();

        // add parameters to the url
        let url = (await this.buildAPIUrl()) + path;
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
    }

    buildCanonicalQueryString(queryParams: ParamMap) {
        if (!queryParams) {
            return '';
        }

        const sortedQueryParams = Object.getOwnPropertyNames(queryParams).sort();

        return sortedQueryParams.map(paramName => {
            const paramValue = queryParams[paramName];

            if (paramValue === true) {
                return encodeURIComponent(paramName)
            }

            return `${encodeURIComponent(paramName)}=${encodeURIComponent(paramValue.toString())}`
        }).join('&');
    }
}

export {
    StoreKeys,
    isDefaultApi,
    setStageInStore,
    getStageFromStore,
    setVersionTagInStore,
    getVersionTagFromStore
};
