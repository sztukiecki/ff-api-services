import { APIClient, APIMapping } from '../../http';


export class GeoLocationController extends APIClient {
    constructor() {
        super(APIMapping.geoInformationService);
    }

    /**
     * Fetches a polygon by its geolocation id e.g. AB+AA+
     * @param geolocationId
     */
    async fetchByGeolocationId(geolocationId: string) {
        return this.invokeApiWithErrorHandling(`/geolocations/${geolocationId}`, 'GET')
    }

}
