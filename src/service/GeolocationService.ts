import {APIClient, APIMapping} from '../http';
import { CancelToken } from "axios";

export class GeolocationService extends APIClient {

    constructor() {
        super(APIMapping.geolocationService);
    }

    getAutocompletionResults(query: string, cancelToken: CancelToken) {
        const additionalParams = {
            queryParams: {
                q: query
            },
            cancelToken
        };
        return this.invokeApi('/search', 'GET', undefined, additionalParams).then(s => s.data);
    }

    getBestMatchCoordinates(query: string) {
        const additionalParams = {
            queryParams: {
                q: query
            }
        };
        return this.invokeApi('/getBestMatchCoordinates', 'GET', undefined, additionalParams).then(s => s.data);
    }
}

export default new GeolocationService();
