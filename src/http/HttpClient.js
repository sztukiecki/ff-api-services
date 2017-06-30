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


const setVersionTagFromStore = (versionTag) => {
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
    serviceName = undefined;
    stageToUse = undefined;
    apiVersionTag = undefined;

    constructor(apiMapping) {
        if (apiMapping === undefined || apiMapping.name.trim().length === 0) {
            console.warn('http client has some invalid initial configs');
        }

        this.serviceName = apiMapping.name;
        this.apiClient = new APIClient({});
        this.getStage();
    }

    setAPIURL = () => {
        if (this.apiClient) {
            this.apiClient.config.url = `https://cloudios.${this.stageToUse}.flowfact.cloud/edge-service/${this.serviceName}/${this.apiVersionTag}`;
        }
    };

    getStage = () => {
        this.stageToUse = getStageFromStore();
        this.apiVersionTag = getVersionTagFromStore();
        this.setAPIURL();
    };

    makeRequest(params, path, method, body = undefined, additionalParams = undefined) {
        this.getStage();
        return this.apiClient.invokeApi(params, path, method, additionalParams, body);
    }

    makeRequestSimple(body, path, method) {
        this.getStage();
        return this.apiClient.invokeApi(undefined, path, method, undefined, body);
    }
}

export default HttpClient;
export {
    StoreKeys,
    isDefaultApi,
    setStageInStore,
    getStageFromStore,
    setVersionTagFromStore,
    getVersionTagFromStore
};
