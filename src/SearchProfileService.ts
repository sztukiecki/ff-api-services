import { AxiosResponse } from 'axios';
import { APIClient, APIMapping } from './http';
import { SearchprofileService as SearchprofileServiceTypes } from '@flowfact/types';

export class SearchProfileService extends APIClient {
    constructor() {
        super(APIMapping.searchProfileService);
    }

    /**
     * Fetches the configuration on how the Matchmaking-UI should be displayed
     * Tries to retrieve config for current company, when none is found, falls back to a global config
     */
    async fetchConfiguration(): Promise<AxiosResponse<SearchprofileServiceTypes.Configuration>> {
        return this.invokeApi(`/matchmaking/configuration`, 'GET');
    }

    /**
     * Creates a configuration on how the Matchmaking-UI should be displayed for the current company
     */
    async createConfiguration(config: SearchprofileServiceTypes.Configuration): Promise<AxiosResponse> {
        return this.invokeApi(`/matchmaking/configuration`, 'POST', config);
    }

    /**
     * Updates the configuration on how the Matchmaking-UI should be displayed for the current company
     */
    async updateConfiguration(config: SearchprofileServiceTypes.Configuration): Promise<AxiosResponse> {
        return this.invokeApi(`/matchmaking/configuration`, 'PUT', config);
    }

    /**
     * Deletes the configuration on how the Matchmaking-UI should be displayed for the current company
     */
    async deleteConfiguration(): Promise<AxiosResponse> {
        return this.invokeApi(`/matchmaking/configuration`, 'DELETE');
    }

    /**
     * Retrieves all searchprofiles of a company
     * @param page
     * @param size
     */
    async fetchAllSearchProfiles(page: number = 1, size: number = 10): Promise<AxiosResponse<{
        results: SearchprofileServiceTypes.Searchprofile[]
    }>> {
        const queryParams: any = {
            page: page.toString(),
            size: size.toString()
        };
        return this.invokeApi(`/search-profiles`, 'GET', undefined, {queryParams});
    }

    /**
     * Creates a new searchprofile
     * @param searchProfile
     */
    async createSearchProfile(searchProfile: SearchprofileServiceTypes.Searchprofile): Promise<AxiosResponse<SearchprofileServiceTypes.Searchprofile>> {
        return this.invokeApi(`/search-profiles`, 'POST', searchProfile);
    }

    /**
     * Retrieves an existing searchprofile by its id
     * @param searchProfileId
     */
    async fetchSearchProfile(searchProfileId: string): Promise<AxiosResponse<SearchprofileServiceTypes.Searchprofile>> {
        return this.invokeApi(`/search-profiles/${searchProfileId}`, 'GET', undefined);
    }

    /**
     * Updates an existing searchprofile
     * @param searchProfile
     */
    async updateSearchProfile(searchProfile: SearchprofileServiceTypes.Searchprofile): Promise<AxiosResponse<SearchprofileServiceTypes.Searchprofile>> {
        return this.invokeApi(`/search-profiles/${searchProfile.id}`, 'PUT', searchProfile);
    }

    /**
     * Deletes a searchprofile by its id
     * @param searchProfileId
     */
    async deleteSearchProfile(searchProfileId: string): Promise<AxiosResponse> {
        return this.invokeApi(`/search-profiles/${searchProfileId}`, 'DELETE', undefined);
    }

    /**
     * Executes a search using the search terms (conditions) in the searchprofile
     * @param model
     */
    async searchEntities(model: SearchprofileServiceTypes.Searchprofile): Promise<AxiosResponse<any[]>> {
        return this.invokeApi(`/search`, 'POST', model);
    }

    /**
     * Executes a reverse search against saved searchprofiles for the specified schemaGroup and saved entity (by Id)
     * @param entityId
     * @param schemaGroup
     */
    async searchProfiles(entityId: string, schemaGroup: string = 'estates'): Promise<AxiosResponse> {
        return this.invokeApi(`/search/reverse/schema/${schemaGroup}/entity/${entityId}`, 'POST');
    }
}

export default new SearchProfileService();
