import {APIClient, APIMapping} from '../http';
import {AxiosResponse} from 'axios';
import {Flowdsl} from "@flowfact/node-flowdsl/lib/Flowdsl";

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

    searchEntity(index: string, viewName: string, searchTerm: string, flowdsl?: Flowdsl, page: number = 1, size: number = 10): Promise<AxiosResponse> {
        const queryParams: any = {};
        queryParams.page = page;
        queryParams.size = size;
        queryParams.viewName = viewName;

        return this.invokeApi(`/search/schemas/${index}`, 'POST', flowdsl, {
            queryParams: queryParams
        });
    }

    /**
     * Delete a entity in the Backend
     */
    deleteEntity(entityId: string, schemaId: string): Promise<AxiosResponse> {
        return this.invokeApi(`/schemas/${schemaId}/entities/${entityId}`, 'DELETE');
    }

    /**
     * Update a entity in the backend
     */
    updateEntityField(schemaId: string, entityId: string, field: any): Promise<AxiosResponse> {
        return this.invokeApi(`/schemas/${schemaId}/entities/${entityId}`, 'PATCH', field);
    }

    getEntityWithViewDefinition(viewId: string, schemaId: string, entityId: string): Promise<AxiosResponse> {
        return this.invokeApi(`/views/${viewId}/schemas/${schemaId}/entities/${entityId}`, 'GET');
    }

    getEntity(schemaId: string, entityId: string): Promise<AxiosResponse> {
        return this.invokeApi(`/schemas/${schemaId}/entities/${entityId}`, 'GET');
    }

    /**
     * Get the history of a entity in a well formatted form.
     */
    getHistory(schemaId: string, entityId: string, page: number): Promise<AxiosResponse> {
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
        return this.invokeApi(`/users/${userId}/hasaccess/${accessType}`, 'POST', listOfEntitesAsJsonString);
    }

}

export default new EntityService();
