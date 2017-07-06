import * as store from 'store';
import APIClient, {APIClientAdditionalParams} from './APIClient';
import {APIMappingClass} from './APIMapping';

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

const setStageInStore = (stage: string) => {
    'use strict';
    if (stage) {
        store.set(StoreKeys.EdgeServiceStage, stage);
    }
};


const setVersionTagInStore = (versionTag: string) => {
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
    apiClient: APIClient = new APIClient({});
    serviceName?: string;
    stageToUse: string;
    apiVersionTag: string;

    constructor(apiMapping: APIMappingClass) {
        if (apiMapping === undefined || apiMapping.name.trim().length === 0) {
            console.warn('http client has some invalid initial configs');
        }

        this.serviceName = apiMapping.name;
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

    makeRequest(path: string, method: string, body?: string|{}, additionalParams?: APIClientAdditionalParams) {
        this.getStage();
        return this.apiClient.invokeApi(path, method, additionalParams, body);
    }

    makeRequestSimple(body: string|{}, path: string, method: string) {
        this.getStage();
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
