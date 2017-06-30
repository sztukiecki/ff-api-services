import HttpClient, {APIMapping} from '../http';

export default class GeolocationService {

    static client = new HttpClient(APIMapping.geolocationService);

    static getAutocompletionResults(query, cancelToken) {
        const additionalParams = {
            queryParams: {
                q: query
            },
            cancelToken
        };
        return this.client.makeRequest({}, '/search', 'GET', undefined, additionalParams).then(s => s.data);
    }

    static getBestMatchCoordinates(query) {
        const additionalParams = {
            queryParams: {
                q: query
            }
        };
        return this.client.makeRequest({}, '/getBestMatchCoordinates', 'GET', undefined, additionalParams).then(s => s.data);
    }
}
