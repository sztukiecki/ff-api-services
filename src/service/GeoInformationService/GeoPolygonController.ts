import { APIClient, APIMapping } from '../../http';
import { GeoInformationsServiceTypes } from './GeoInformationService.Types';
import ListOfPolygons = GeoInformationsServiceTypes.ListOfPolygons;

export class GeoPolygonController extends APIClient {
    constructor() {
        super(APIMapping.geoInformationService);
    }

    /**
     * fetch list of all the polygons
     */
    async fetchAll() {
        return this.invokeApiWithErrorHandling<ListOfPolygons>('/polygons', 'GET');
    }

    /**
     * create polygon of type LINE, LINESTRING, POLYGON and MULTIPOLYGON
     */
    async create() {
        return this.invokeApiWithErrorHandling<ListOfPolygons>('/polygons', 'POST');
    }

    /**
     * fetch polygon by name
     * @param name
     */
    async fetchByName(name: string) {
        return this.invokeApiWithErrorHandling<ListOfPolygons>(`/polygons/${name}`, 'GET');
    }

    /**
     * update polygon by name
     * @param name
     */
    async updateByName(name: string) {
        return this.invokeApiWithErrorHandling<ListOfPolygons>(`/polygons/${name}`, 'PUT');
    }

    /**
     * delete polygon by name
     * @param name
     */
    async deleteByName(name: string) {
        return this.invokeApiWithErrorHandling<ListOfPolygons>(`/polygons/${name}`, 'DELETE');
    }
}
