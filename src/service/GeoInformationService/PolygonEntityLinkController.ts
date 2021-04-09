import { APIClient, APIMapping } from '../../http';
import { GeoInformationsServiceTypes } from './GeoInformationService.Types';
import LinkedPolygon = GeoInformationsServiceTypes.LinkedPolygon;
import ListOfPolygons = GeoInformationsServiceTypes.ListOfPolygons;

export class PolygonEntityLinkController extends APIClient {
    constructor() {
        super(APIMapping.geoInformationService);
    }

    /**
     * link a polygon to an entity
     */
    async linkPolygon() {
        return this.invokeApiWithErrorHandling<LinkedPolygon>('/polygons/entity', 'POST');
    }

    /**
     * fetch list of all the polygons by entityId
     * @param entityId
     */
    async fetchAll(entityId: string) {
        return this.invokeApiWithErrorHandling<ListOfPolygons>(`/polygons/entity/${entityId}`, 'GET');
    }

    /**
     * de-link all the polygons by entityId
     * @param entityId
     */
    async deleteAll(entityId: string) {
        return this.invokeApiWithErrorHandling(`/polygons/entity/${entityId}`, 'DELETE');
    }
}
