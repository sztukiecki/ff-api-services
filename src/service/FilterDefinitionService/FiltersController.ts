import { APIClient, APIMapping } from '../../http';
import { FilterDefinitionServiceTypes } from './FilterDefinitionService.Types';

import FilterDefinition = FilterDefinitionServiceTypes.FilterDefinition;

export class FiltersController extends APIClient {
    constructor() {
        super(APIMapping.filterDefinitionService);
    }

    /**
     * Fetchs filter for a specific schema
     * @param schemaName
     */
    async fetchFilter(schemaName: string) {
        return await this.invokeApiWithErrorHandling<FilterDefinition>('/filters', 'GET', undefined, {
            queryParams: {
                schemaName: schemaName,
            },
        });
    }

    /**
     * Get all saved filters for a schema
     * @param schemaName
     */
    async fetchSavedFilters(schemaName: string) {
        return await this.invokeApiWithErrorHandling<{ entries: FilterDefinition[] }>(`/filters/saved/schemas/${schemaName}`, 'GET');
    }

    /**
     * Create a new saved filter for a schema
     * @param filterDefinition
     */
    async createSavedFilter(filterDefinition: FilterDefinition) {
        return await this.invokeApiWithErrorHandling<FilterDefinition>('/filters/saved', 'POST', filterDefinition);
    }

    /**
     * Update a saved filter by his id.
     * @param filterId
     * @param filterDefinition
     */
    async updateSavedFilter(filterId: string, filterDefinition: FilterDefinition) {
        return await this.invokeApiWithErrorHandling<FilterDefinition>(`/filters/saved/${filterId}`, 'PATCH', filterDefinition);
    }

    /**
     * Delete a saved filter by his id.
     * @param filterId
     */
    async deleteSavedFilter(filterId: string) {
        return await this.invokeApiWithErrorHandling(`/filters/saved/${filterId}`, 'DELETE');
    }
}
