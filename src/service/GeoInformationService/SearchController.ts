import { APIClient, APIMapping } from '../../http';
import { GeoInformationsServiceTypes } from './GeoInformationService.Types';


export class SearchController extends APIClient {
    constructor() {
        super(APIMapping.geoInformationService);
    }

    /**
     * free text search for polygons based on captions
     * @param query
     */
    async findPolygon(query: string) {
        return this.invokeApiWithErrorHandling<GeoInformationsServiceTypes.FindPolygonResponse>(`/polygons/search?q=${query}`, 'GET');
    }
}
