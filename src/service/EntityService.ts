import {APIClient, APIMapping} from '../http';
import {AxiosResponse} from 'axios';

export interface HasRightsModel {
    schemaId: string,
    entityId: string,
    hasAccess: boolean
}

export class EntityService extends APIClient {

    constructor() {
        super(APIMapping.entityService);
    }

    createEntity(schemaId: string, entity: any): Promise<AxiosResponse> {
        return this.invokeApi(`/schemas/${schemaId}`, 'POST', entity || {});
    }

    /**
     * Delete a entity in the Backend
     */
    deleteEntity(entityId: string, schemaId: string) {
        return this.invokeApi(`/schemas/${schemaId}/entities/${entityId}`, 'DELETE');
    }

    /**
     * Update a entity in the backend
     */
    updateEntityField(schemaId: string, entityId: string, field: any) {
        return this.invokeApi(`/schemas/${schemaId}/entities/${entityId}`, 'PATCH', field);
    }

    getEntityWithViewDefinition(viewId: string, schemaId: string, entityId: string) {
        return this.invokeApi(`/views/${viewId}/schemas/${schemaId}/entities/${entityId}`, 'GET');
    }

    getEntity(schemaId: string, entityId: string) {
        return this.invokeApi(`/schemas/${schemaId}/entities/${entityId}`, 'GET');
    }

    /**
     * Get the history of a entity in a well formatted form.
     */
    getHistory(schemaId: string, entityId: string, page: number) {
        return this.invokeApi(`/schemas/${schemaId}/entities/${entityId}/history?page=${page}&size=15&order=DESC`, 'GET');
    }

    /**
     * Check the right of a user to access a single entity, where "access" means one of: read, write, delete or search.
     * @param {string} schemaId
     * @param {string} entityId
     * @param {string} userId
     * @param {string} accessType - READ, UPDATE, SEARCH, DELETE
     * @returns {boolean}
     */
    getHasAccessForSingleEntity(schemaId: string, entityId: string, userId: string, accessType: string): Promise<AxiosResponse> {
        return this.invokeApi(`/schemas/${schemaId}/entities/${entityId}/users/${userId}/hasaccess/${accessType}`, 'GET');
    }

    /**
     * Check the rights of a user to access several entities, where "access" means one of: read, write, delete or search.
     * @returns object - Returns a JSON object, that looks like the one you posted, but with an addtional field for each item with the name "hasAccess" and a boolean.
     * @param {string} userId
     * @param {string} accessType - READ, UPDATE, SEARCH, DELETE
     * @param {HasRightsModel[]} listOfEntitesAsJsonString - Something like: [{"schemaId":"3ecf...","entityId":"3c30...","hasAccess":true},{"schemaId":"3ecf...","entityId":"3c30...","hasAccess":true}]
     */
    getHasAccessForMultipleEntities(userId: string, accessType: string, listOfEntitesAsJsonString: HasRightsModel[]): Promise<AxiosResponse> {
        return this.invokeApi(`/users/${userId}/hasright/${accessType}`, 'POST', listOfEntitesAsJsonString);
    }

}

export default new EntityService();
