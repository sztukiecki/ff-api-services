import { APIClient, APIMapping } from '../../http';


export class SearchController extends APIClient {
    constructor() {
        super(APIMapping.geoInformationService);
    }

    /**
     * free text search for polygons based on captions
     * @param query
     */
    async findPolygon(query: string) {
        return this.invokeApiWithErrorHandling('/polygons/search', 'GET', query)
    }
}
