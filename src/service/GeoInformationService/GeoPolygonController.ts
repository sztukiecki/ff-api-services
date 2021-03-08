import { APIClient, APIMapping } from '../../http';


export class GeoPolygonController extends APIClient {
    constructor() {
        super(APIMapping.geoInformationService);
    }

    /**
     * fetch list of all the polygons
     */
    async fetchAll() {
        return this.invokeApiWithErrorHandling('/polygons', 'GET')
    }

    /**
     * create polygon of type LINE, LINESTRING, POLYGON and MULTIPOLYGON
     */
    async create() {
        return this.invokeApiWithErrorHandling('/polygons', 'POST')
    }

    /**
     * fetch polygon by name
     * @param name
     */
    async fetchByName(name: string) {
        return this.invokeApiWithErrorHandling(`/polygons/${name}`, 'GET')
    }

    /**
     * update polygon by name
     * @param name
     */
    async updateByName(name: string) {
        return this.invokeApiWithErrorHandling(`/polygons/${name}`, 'PUT')
    }

    /**
     * delete polygon by name
     * @param name
     */
    async deleteByName(name: string) {
        return this.invokeApiWithErrorHandling(`/polygons/${name}`, 'DELETE')
    }
}
