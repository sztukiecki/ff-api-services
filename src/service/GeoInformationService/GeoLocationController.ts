import { APIClient, APIMapping } from '../../http';
import {GeoInformationsServiceTypes} from './GeoInformationService.Types';
import ListOfPolygons = GeoInformationsServiceTypes.ListOfPolygons;


export class GeoLocationController extends APIClient {
    constructor() {
        super(APIMapping.geoInformationService);
    }

    /**
     * Fetches a polygon by its geolocation id e.g. AB+AA+
     * @param geolocationId
     */
    async fetchByGeolocationId(geolocationId: string) {
        return this.invokeApiWithErrorHandling<ListOfPolygons>(`/geolocations/${geolocationId}`, 'GET')
    }

}
