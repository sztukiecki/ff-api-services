import store from 'store';
import APIClient from './APIClient';

const StoreKeys = {
    EdgeServiceStage: 'HTTPCLIENT.APICLIENT.STAGE'
};

const defaultStage = 'stable';

const getStageFromStore = () => {
    'use strict';
    const fromStore = store.get(StoreKeys.EdgeServiceStage);
    return fromStore ? fromStore : defaultStage;
};

const setStageInStore = (stage) => {
    'use strict';
    if (stage) {
        store.set(StoreKeys.EdgeServiceStage, stage);
    }
};

const isDefaultStage = (stageToUse) => {
    'use strict';
    return stageToUse === defaultStage;
};

class HttpClient {
    
    apiClient = undefined;
    serviceName = undefined;
    stageToUse = undefined;

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
            this.apiClient.config.url = `https://cloudios.development.flowfact.cloud/edge-service/${this.serviceName}/${this.stageToUse}`;
        }
    };

    getStage = () => {
        this.stageToUse = getStageFromStore();
        this.setAPIURL();
    };

    makeRequest(params, path, method, body = undefined, additionalParams = undefined) {
        this.getStage();
        return this.apiClient.invokeApi(params, path, method, additionalParams, body);
    }

    /**
     * @deprecated Use makeRequestSimple instead (damn typo)
     */
    makeRequetSimple(body, path, method) {
        return this.makeRequestSimple(body, path, method);
    }

    makeRequestSimple(body, path, method) {
        this.getStage();
        return this.apiClient.invokeApi(undefined, path, method, undefined, body);
    }
}

export default HttpClient;
export {
    StoreKeys,
    isDefaultStage,
    setStageInStore,
    getStageFromStore
};