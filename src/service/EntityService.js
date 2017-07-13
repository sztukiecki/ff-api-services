import HttpClient, {APIMapping} from '../http';

export default class EntityService {

    static client = new HttpClient(APIMapping.entityService);

    static createEntity(schemaId) {
        return EntityService.client.makeRequest({}, `/schemas/${schemaId}`, 'POST', {});
    }

    /**
     * Delete a entity in the Backend
     * @param entityId
     * @param schemaId
     */
    static deleteEntity(entityId, schemaId) {
        return EntityService.client.makeRequest({}, `/schemas/${schemaId}/entities/${entityId}`, 'DELETE');
    }

    /**
     * Update a entity in the backend
     * @param schemaId
     * @param entityId
     * @param entity
     * @returns {*}
     */
    static updateEntityField(schemaId, entityId, field) {
        return EntityService.client.makeRequest({}, `/schemas/${schemaId}/entities/${entityId}`, 'PATCH', field);
    }

    static getEntityWithViewDefinition(viewId, schemaId, entityId) {
        return EntityService.client.makeRequest({}, `/views/${viewId}/schemas/${schemaId}/entities/${entityId}`, 'GET');
    }

    static getEntity(schemaId, entityId) {
        return EntityService.client.makeRequest({}, `/schemas/${schemaId}/entities/${entityId}`, 'GET');
    }
}