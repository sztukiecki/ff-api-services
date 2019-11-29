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
    async fetchSavedFilters(schemaName: string): Promise<AxiosResponse<FilterDefinition[]>> {
        return await this.invokeApi('/filters/saved', 'GET');
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
}

export default new FilterDefinitionService();
