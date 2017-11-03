import {APIClient, APIMapping} from '../http';
import { AxiosResponse } from 'axios';

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
}

export default new EntityService();
