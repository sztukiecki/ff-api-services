import * as store from 'store';
import APIClient, {APIClientAdditionalParams} from './APIClient';
import {APIService} from './APIMapping';

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

class HttpClient {

    apiClient: APIClient;
    apiService: APIService;
    stageToUse: string;
    apiVersionTag: string;

    constructor(apiService: APIService) {
        this.apiService = apiService;
        this.stageToUse = getStageFromStore();
        this.apiVersionTag = getVersionTagFromStore();
        this.apiClient = new APIClient({
            'axios': apiService.axiosConfiguration,
            'url': this.buildAPIUrl()
        });
    }
// https://services.production.cloudios.flowfact-prod.cloud/edge-service/management/health
    buildAPIUrl = () => {
        const account = this.stageToUse === 'development' ? 'flowfact-dev' : 'flowfact-prod';
        const baseUrl = this.stageToUse === 'local'
            ? 'http://localhost:8080'
            : `https://services.${this.stageToUse}.cloudios.${account}.cloud/edge-service`;
        return `${baseUrl}/${this.apiService.name}/${this.apiVersionTag}`;
    };

    makeRequest(path: string, method: string, body?: string|{}, additionalParams?: APIClientAdditionalParams) {
        return this.apiClient.invokeApi(path, method, additionalParams, body);
    }

    makeRequestSimple(body: string|{}, path: string, method: string) {
        return this.apiClient.invokeApi(path, method, undefined, body);
    }
}

export default HttpClient;
export {
    StoreKeys,
    isDefaultApi,
    setStageInStore,
    getStageFromStore,
    setVersionTagInStore,
    getVersionTagFromStore
};
