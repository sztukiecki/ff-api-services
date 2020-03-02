import { Customisation, ViewDefinition, ViewDefinitionCategory, ViewType } from '@flowfact/types';
import { AxiosResponse } from 'axios';
import { APIClient, APIMapping } from '../http';
import * as qs from 'qs';

export class ViewDefinitionService extends APIClient {

    constructor() {
        super(APIMapping.viewDefinitionService);
    }

    /**
     * TODO: Please comment this method
     * @param schemaId
     */
    async fetchDefinitionsForSchema(schemaId: string): Promise<AxiosResponse> {
        return await this.invokeApi('/views', 'GET', undefined, {
            queryParams: {
                schemaId,
            },
        });
    }

    /**
     * TODO: Please comment this method
     * @param viewDefinitionId
     */
    async fetchDefinition(viewDefinitionId: string): Promise<AxiosResponse> {
        return await this.invokeApi(`/views/${viewDefinitionId}`, 'GET');
    }

    /**
     * Returns statistics for all views of a specific schema
     * @param schemaIdOrName
     */
    async fetchStatistics(schemaIdOrName: string): Promise<AxiosResponse> {
        return await this.invokeApi(`/views/${schemaIdOrName}/statistics`, 'GET');
    }

    /**
     * TODO: Please comment this method
     * @param viewDefinitionId
     * @param viewDefinition
     */
    async updateDefinition(viewDefinitionId: string, viewDefinition: ViewDefinition) {
        return await this.invokeApi(`/views/${viewDefinitionId}`, 'PUT', viewDefinition);
    }

    /**
     * TODO: Please comment this method
     * @param viewDefinition
     */
    async createDefinition(viewDefinition: ViewDefinition) {
        return await this.invokeApi('/views', 'POST', viewDefinition);
    }

    /**
     * TODO: Please comment this method
     * @param viewDefinitionId
     */
    async deleteDefinition(viewDefinitionId: string) {
        return await this.invokeApi(`/views/${viewDefinitionId}`, 'DELETE');
    }

    /**
     * TODO: Please comment this method
     * @param viewId
     * @param categoryName
     * @param categoryDefinition
     */
    async updateCategory(viewId: string, categoryName: string, categoryDefinition: ViewDefinitionCategory) {
        return await this.invokeApi(`/views/${viewId}/categories/${categoryName}`, 'PATCH', categoryDefinition);
    }

    /**
     * TODO: Please comment this method
     * @param viewId
     * @param categoryDefinition
     */
    async addCategory(viewId: string, categoryDefinition: ViewDefinitionCategory) {
        return await this.invokeApi(`/views/${viewId}/categories`, 'PATCH', categoryDefinition);
    }

    /**
     * TODO: Please comment this method
     * @param viewId
     * @param categoryName
     */
    async deleteCategory(viewId: string, categoryName: string) {
        return await this.invokeApi(`/views/${viewId}/categories/${categoryName}`, 'DELETE');
    }

    /**
     * TODO: Please comment this method
     * @param viewName
     */
    async listFieldsOfViews(viewName: string) {
        return await this.invokeApi(`/views/fields/${viewName}`, 'GET');
    }

    /**
     * TODO: Please comment this method
     * @param schemaId
     * @param viewName
     */
    async fetchBySchemaAndName(schemaId: string, viewName: string) {
        return await this.invokeApi(`/views/schema/${schemaId}/name/${viewName}`, 'GET');
    }

    /**
     * Returns views of the current company with a specific type
     * @param schemaId
     * @param viewType
     */
    async fetchBySchemaAndType(schemaId: string, viewType: ViewType) {
        return await this.invokeApi(`/views/schema/${schemaId}/type/${viewType}`, 'GET');
    }

    /**
     * Returns one or more view definitions by given types for a specific schema
     * @param schemaId
     * @param viewTypes
     */
    async fetchBySchemaAndTypes(schemaId: string, viewTypes: ViewType[]) {
        return await this.invokeApi(`/views/schema/${schemaId}`, 'GET', undefined, {
            params: {types: viewTypes},
            paramsSerializer: params => qs.stringify(params, {indices: false})
        });
    }

    /**
     * Saves the given customisation and triggers an event applying the customisation
     * @param customisation
     */
    async saveCustomisation(customisation: Customisation): Promise<void> {
        await this.invokeApi('/customisations', 'POST', customisation);
    }

    /**
     * This function sends a whole view definition to the view-definition-service. The service compares the new view definition to
     * the current one in the database to save which changes are made.
     * @param viewDefinition
     */
    async saveCustomisations(viewDefinition: ViewDefinition): Promise<void> {
        await this.invokeApi(`/customisations/view/${viewDefinition.id}`, 'PUT', viewDefinition);
    }
}

export default new ViewDefinitionService();
