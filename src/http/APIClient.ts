import AWS from '@flowfact/aws-sdk';
import axios, {AxiosError, AxiosRequestConfig, AxiosResponse, CancelToken } from 'axios';
import * as axiosRetry from 'axios-retry';
import * as isNode from 'detect-node';
import * as store from 'store';
import ConsulClient from "@flowfact/consul-client";
import { APIService } from "./APIMapping";

const StoreKeys = {
    EdgeServiceStage: 'HTTPCLIENT.APICLIENT.STAGE',
    EdgeServiceVersionTag: 'HTTPCLIENT.APICLIENT.VERSIONTAG'
};

const defaultStage = isNode ? 'development' : 'production';
const defaultVersionTag = isNode ? 'latest' : 'stable';

const getStageFromStore = () =>
    store.get(StoreKeys.EdgeServiceStage) || defaultStage;

const getVersionTagFromStore = () =>
    store.get(StoreKeys.EdgeServiceVersionTag) || defaultVersionTag;

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
    serviceName: string;
    axios?: AxiosConfig;
}

export interface APIClientAdditionalParams {
    headers?: string | ParamMap;
    queryParams?: ParamMap;
    cancelToken?: CancelToken;
}

export default class APIClient {
    idToken: string = '';
    userId: string;
    static stageToUse: string;
    static apiVersionTag: string;

    private _consulClient?: ConsulClient;
    private _axiosConfig?: AxiosConfig;
    private _serviceName: string;

    constructor(service: APIService) {
        this._axiosConfig = service.axiosConfiguration;
        this._serviceName = service.name;
    }

    private _getStage = () =>
        isNode ? (this.constructor as typeof APIClient).stageToUse : getStageFromStore();

    private _getVersionTag = () =>
        isNode ? (this.constructor as typeof APIClient).apiVersionTag : getVersionTagFromStore();

    withUserId(userId: string): this {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this, {userId})
    }

    updateUserCredentials() {
        if (AWS.Config.credentials && AWS.Config.credentials.params && AWS.Config.credentials.params.Logins) {
            const loginKeys = Object.keys(AWS.Config.credentials.params.Logins);
            if (loginKeys.length > 0) {
                this.idToken = AWS.Config.credentials.params.Logins[loginKeys[0]];
            }
        }

        if (!isNode && (!this.idToken || this.idToken.trim().length === 0)) {
            console.warn('no id token is set');
        }
    }

    private _getConsulClient(): ConsulClient {
        if (!this._consulClient) {
            // Dirty hack: Remove the protocol from the environment value. The Java Consul Client needs it, so the value
            // might contain the protocol. The nodejs consul client does not accept it for whatever reason.
            const consulUrl = (process.env.CONSUL_CLIENT_HOST || 'consulclients.development.flowfact-dev.cloud').replace(/https?:\/\//, '');
            const consulPort = process.env.CONSUL_CLIENT_PORT || '8500';

            // TODO figure out a way to get the name of the executing service here
            this._consulClient = new ConsulClient(consulUrl, consulPort, 'api-services', this._getStage(), this._getVersionTag());
        }

        return this._consulClient!;
    }

    private async buildAPIUrl() {
        let baseUrl;
        if (isNode) {
            const selected = await this._getConsulClient().service.select(this._serviceName);
            return `http://${selected.address}:${selected.port}`;
        } else {
            const stage = this._getStage();
            const account = stage === 'development' ? 'flowfact-dev' : 'flowfact-prod';
            baseUrl = stage === 'local'
                ? 'http://localhost:8080'
                : `https://api.${stage}.cloudios.${account}.cloud`;
        }
        return `${baseUrl}/${this._serviceName}/${this._getVersionTag()}`;
    };

    public async invokeApi(path: string, method: string, body: string | {} = '', additionalParams: APIClientAdditionalParams = {}): Promise<AxiosResponse> {
        if (!path.startsWith('/')) {
            throw new Error('missing slash at the beginning');
        }

        this.updateUserCredentials();

        // add parameters to the url
        let url = (await this.buildAPIUrl()) + path;
        if (additionalParams.queryParams) {
            const queryString = this.buildCanonicalQueryString(additionalParams.queryParams);
            if (queryString !== '') {
                url += '?' + queryString;
            }
        }

        // setup the requst
        const userIdentification = isNode ? {
            userId: this.userId
        } : {
            cognitoToken: this.idToken
        };

        let request: AxiosRequestConfig = {
            method: method,
            url: url,
            headers: Object.assign({}, userIdentification, additionalParams.headers || {}),
            data: body,
            cancelToken: additionalParams.cancelToken
        };

        const client = axios.create();

        const axiosConfiguration = this._axiosConfig;
        if (axiosConfiguration) {
            if (axiosConfiguration['axios-retry']) {
                axiosRetry(client, {
                    retries: axiosConfiguration['axios-retry'].retries,
                    retryCondition: (error: AxiosError) => {
                        return Boolean(error && error.response && error.response.status >= 500 && method != 'POST');
                    }
                });
            }
        }

        // fire the request
        // NEVER put a catch here because it prevents all other error handling
        // i.e. you can't handle a service returning an http code >= 400 (which is possibly expected)
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
