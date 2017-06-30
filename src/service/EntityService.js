import HttpClient, {APIMapping} from '../http';

export default class EntityService {

    static client = new HttpClient(APIMapping.entityService);

    /**
     * Delete a entity in the Backend
     * @param entityId
     * @param schemaId
     */
    static deleteEntity(entityId, schemaId) {
        return this.client.makeRequest({}, `/schemas/${schemaId}/entities/${entityId}`, 'DELETE');
    }

    /**
     * Update a entity in the backend
     * @param schemaId
     * @param entityId
     * @param entity
     * @returns {*}
     */
    static updateEntity(schemaId, entityId, entity) {
        return this.client.makeRequest({}, `/schemas/${schemaId}/entities/${entityId}`, 'PUT', entity);
    }

    static getEntityWithViewDefinition(viewId, schemaId, entityId) {
        return this.client.makeRequest({}, `/views/${viewId}/schemas/${schemaId}/entities/${entityId}`, 'GET');
    }
}
