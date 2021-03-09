import { APIClient, APIMapping } from '../../http';


export class SearchController extends APIClient {
    constructor() {
        super(APIMapping.geoInformationService);
    }

    /**
     * free text search for polygons based on captions
     * @param q
     */
    async findPolygon(q: string) {
        return this.invokeApiWithErrorHandling(`/polygons/search?q=${q}`, 'GET')
    }
}
