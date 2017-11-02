import APIClient, {APIClientAdditionalParams} from './APIClient';
import {APIService} from './APIMapping';

class HttpClient {

    apiClient: APIClient;
    apiService: APIService;

    constructor(apiService: APIService) {
        this.apiService = apiService;
        this.apiClient = new APIClient({
            axios: apiService.axiosConfiguration,
            serviceName: this.apiService.name
        });
    }

    makeRequest(path: string, method: string, body?: string|{}, additionalParams?: APIClientAdditionalParams) {
        return this.apiClient.invokeApi(path, method, additionalParams, body);
    }

    makeRequestSimple(body: string|{}, path: string, method: string) {
        return this.apiClient.invokeApi(path, method, undefined, body);
    }
}

export default HttpClient;
