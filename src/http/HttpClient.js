import store from 'store';
import APIClient from './APIClient';

const StoreKeys = {
    EdgeServiceStage: 'HTTPCLIENT.APICLIENT.STAGE',
    EdgeServiceVersionTag: 'HTTPCLIENT.APICLIENT.VERSIONTAG'
};

const defaultStage = 'staging';
const defaultVersionTag = 'stable';

const getStageFromStore = () => {
    'use strict';
    const fromStore = store.get(StoreKeys.EdgeServiceStage);
    return fromStore ? fromStore : defaultStage;
};

const getVersionTagFromStore = () => {
    'use strict';
    const fromStore = store.get(StoreKeys.EdgeServiceVersionTag);
    return fromStore ? fromStore : defaultVersionTag;
};

const setStageInStore = (stage) => {
    'use strict';
    if (stage) {
        store.set(StoreKeys.EdgeServiceStage, stage);
    }
};

const setVersionTagInStore = (versionTag) => {
    'use strict';
    if (versionTag) {
        store.set(StoreKeys.EdgeServiceVersionTag, versionTag);
    }
};

const isDefaultApi = () => {
    'use strict';
    return (getStageFromStore() === defaultStage) && (getVersionTagFromStore() === defaultVersionTag);
};

class HttpClient {

    apiClient = undefined;
    apiService = undefined;
    stageToUse = undefined;
    apiVersionTag = undefined;

    constructor(apiService) {
        this.apiService = apiService;
        this.stageToUse = getStageFromStore();
        this.apiVersionTag = getVersionTagFromStore();
        this.apiClient = new APIClient({
            'axios': apiService.axiosConfiguration,
            'url': this.buildAPIUrl()
        });
    }

    buildAPIUrl = () => {
        const baseUrl = this.stageToUse === 'local'
            ? 'http://localhost:8080'
            : `https://cloudios.${this.stageToUse}.flowfact.cloud/edge-service`;
        return `${baseUrl}/${this.apiService.name}/${this.apiVersionTag}`;
    };

    makeRequest(params, path, method, body = undefined, additionalParams = undefined) {
        return this.apiClient.invokeApi(params, path, method, additionalParams, body);
    }

    makeRequestSimple(body, path, method) {
        return this.apiClient.invokeApi(undefined, path, method, undefined, body);
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
