import { APIClient, APIMapping } from '../../http';
import { GeoInformationsServiceTypes } from './GeoInformationService.Types';
import FindPolygonResponse = GeoInformationsServiceTypes.FindPolygonResponse;
import GeoInformationValue = GeoInformationsServiceTypes.GeoInformationValue;

export class SearchController extends APIClient {
    constructor() {
        super(APIMapping.geoInformationService);
    }

    /**
     * free text search for polygons based on captions
     * @param query
     */
    async findPolygon(query: string) {
        return this.invokeApiWithErrorHandling<FindPolygonResponse>(`/polygons/search?q=${query}`, 'GET');
    }

    /**
     * fetch one polygon by caption
     * @param caption
     */
    async fetchPolygonDetail(caption: string) {
        return this.invokeApiWithErrorHandling<GeoInformationValue>(`/polygons/${caption}`, 'GET');
    }

    /**
     * fetch polygons list by captions
     * @param captions
     */
    async fetchPolygonDetails(captions: string) {
        return this.invokeApiWithErrorHandling<GeoInformationValue[]>(`/polygons/list?names=${captions}`, 'GET');
    }
}
