import { APIClient, APIMapping } from '../http';
import { AxiosResponse } from 'axios';
import { Flowdsl } from '@flowfact/node-flowdsl/lib/Flowdsl';
import { Entity, EntityACLType, EntityValues, EntityView } from '@flowfact/types';
import { EntityQuery, ParamList, SearchResult, UniformObject } from '../util/InternalTypes';
import { v4 as uuid } from 'uuid/interfaces';

export interface HasRightsModel {
    schemaId: string;
    entityId: string;
    hasAccess: boolean;
}

export class EntityService extends APIClient {

    constructor() {
        super(APIMapping.entityService);
    }

    createEntity(schemaId: string, entity: any): Promise<AxiosResponse> {
        return this.invokeApi(`/schemas/${schemaId}`, 'POST', entity || {});
    }

    searchEntity(index: string, viewName: string, flowdsl?: Flowdsl, page: number = 1, size: number = 20) {
        const queryParams: ParamList = {
            page,
            size,
            viewName
        };

        return this.invokeApi<SearchResult<EntityView>>(`/search/schemas/${index}`, 'POST', flowdsl, {
            queryParams: queryParams
        });
    }

    fetchEntitiesVirtualized(index: string, viewName: string, flowdsl?: Flowdsl, offset: number = 0, size: number = 20) {
        const queryParams: ParamList = {
            offset,
            size,
            viewName
        };

        return this.invokeApi<SearchResult<EntityView>>(`/search/schemas/${index}`, 'POST', flowdsl, {
            queryParams: queryParams
        });
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
    updateEntityField(schemaId: string, entityId: string, field: UniformObject<EntityValues<Entity>>) {
        return this.invokeApi<Entity>(`/schemas/${schemaId}/entities/${entityId}`, 'PATCH', field);
    }

    getEntityWithViewDefinition(viewId: string, schemaId: string, entityId: string) {
        return this.invokeApi<EntityView>(`/views/${viewId}/schemas/${schemaId}/entities/${entityId}`, 'GET');
    }

    getEntity(schemaId: string, entityId: string) {
        return this.invokeApi<Entity>(`/schemas/${schemaId}/entities/${entityId}`, 'GET');
    }

    /**
     * Get the history of a entity in a well formatted form.
     */
    getHistory(schemaId: string, entityId: string, page: number): Promise<AxiosResponse> {
        return this.invokeApi(`/schemas/${schemaId}/entities/${entityId}/history?page=${page}&size=15&order=DESC`, 'GET');
    }

    /**
     * Check the right of a user to access a single entity.
     */
    getHasAccessForSingleEntity(schemaId: string, entityId: string, userId: string, accessType: EntityACLType): Promise<AxiosResponse> {
        return this.invokeApi(`/schemas/${schemaId}/entities/${entityId}/users/${userId}/hasaccess/${accessType}`, 'GET');
    }

    /**
     * Check the rights of a user to access several entities.
     */
    getHasAccessForMultipleEntities(userId: string, accessType: EntityACLType, entities: EntityQuery[]) {
        return this.invokeApi<HasRightsModel[]>(`/users/${userId}/hasaccess/${accessType}`, 'POST', entities);
    }

    /**
     * This method sends entityIds and schemaIds to the entity-service and the entity-service transform this data
     * into views with the entity. So an array will be returned, with the viewEntity.
     */
    transformEntitiesWithView(viewName: string, entityQueries: EntityQuery[]) {
        return this.invokeApi<EntityView[]>(`/views/${viewName}/entities`, 'POST', entityQueries);
    }

    /**
     * Duplicates an entity and its multimedia files like images and documents.
     * @param schemaId
     * @param entityId
     * @returns a new UUID of created entity.
     */
    duplicateEntity(schemaId: uuid, entityId: uuid): Promise<AxiosResponse<uuid>> {
        return this.invokeApi(`/schemas/${schemaId}/entities/${entityId}/duplicate`, 'POST');
    }
}

export default new EntityService();
