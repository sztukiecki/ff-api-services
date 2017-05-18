import store from 'store';
import APIClient from './APIClient';

const StoreKeys = {
    EdgeServiceStage: 'HTTPCLIENT.APICLIENT.STAGE',
    ServiceStage: 'HTTPCLIENT.APICLIENT.STAGE.SERVICE.'
};

const defaultStage = 'stable';

const getFromStore = (key, defaultValue) => {
    'use strict';
    const fromStore = store.get(key);
    return fromStore ? fromStore : defaultValue;
};

class HttpClient {

    apigClient = undefined;

    constructor(apiMapping) {
        if (apiMapping === undefined || apiMapping.name.trim().length === 0) {
            console.warn('http client has some invalid initial configs');
        }

        let stageToUse = getFromStore(StoreKeys.EdgeServiceStage, undefined);

        if (!stageToUse) {
            stageToUse = getFromStore(`${StoreKeys.ServiceStage}${apiMapping.name}`, defaultStage);
        }

        this.apigClient = new APIClient({
            url: `${document.location.protocol}//cloudios-1932238678.eu-central-1.elb.amazonaws.com/edge-service/${apiMapping.name}/${stageToUse}`
        });

    }

    makeRequest(params, path, method, body = undefined, additionalParams = undefined) {
        return this.apigClient.invokeApi(params, path, method, additionalParams, body);
    }

    makeRequetSimple(body, path, method) {
        return this.apigClient.invokeApi(undefined, path, method, undefined, body);
    }
}

export default HttpClient;