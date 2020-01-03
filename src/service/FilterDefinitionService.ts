import { APIClient, APIMapping } from '../http';
import { AxiosResponse } from 'axios';
import { FilterDefinition } from '@flowfact/types';

class FilterDefinitionService extends APIClient {

    constructor() {
        super(APIMapping.filterDefinitionService);
    }

    /**
     * Fetchs filter for a specific schema
     * @param schemaName
     */
    async fetchFilter(schemaName: string): Promise<AxiosResponse<FilterDefinition>> {
        return await this.invokeApi('/filters', 'GET', undefined, {
            queryParams: {
                schemaName: schemaName
            }
        });
    }

    /**
     * Get all saved filters for a schema
     * @param schemaName
     */
    async fetchSavedFilters(schemaName: string): Promise<AxiosResponse<{ entries: FilterDefinition[] }>> {
        return await this.invokeApi(`/filters/saved/schemas/${schemaName}`, 'GET');
    }

    /**
     * Create a new saved filter for a schema
     * @param filterDefinition
     */
    async createSavedFilter(filterDefinition: FilterDefinition): Promise<AxiosResponse<FilterDefinition>> {
        return await this.invokeApi('/filters/saved', 'POST', filterDefinition);
    }

    /**
     * Update a saved filter by his id.
     * @param filterId
     * @param filterDefinition
     */
    async updateSavedFilter(filterId: string, filterDefinition: FilterDefinition): Promise<AxiosResponse<FilterDefinition>> {
        return await this.invokeApi(`/filters/saved/${filterId}`, 'PATCH', filterDefinition);
    }

    /**
     * Delete a saved filter by his id.
     * @param filterId
     */
    async deleteSavedFilter(filterId: string): Promise<AxiosResponse> {
        return await this.invokeApi(`/filters/saved/${filterId}`, 'DELETE');
    }
}

export default new FilterDefinitionService();
