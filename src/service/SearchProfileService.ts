import { AxiosResponse } from 'axios';
import { APIClient, APIMapping } from '../http';
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
     * TODO: Please comment this method
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
     * TODO: Please comment this method
     * @param searchProfile
     */
    async createSearchProfile(searchProfile: SearchprofileServiceTypes.Searchprofile): Promise<AxiosResponse<SearchprofileServiceTypes.Searchprofile>> {
        return this.invokeApi(`/search-profiles`, 'POST', searchProfile);
    }

    /**
     * TODO: Please comment this method
     * @param searchProfileId
     */
    async fetchSearchProfile(searchProfileId: string): Promise<AxiosResponse<SearchprofileServiceTypes.Searchprofile>> {
        return this.invokeApi(`/search-profiles/${searchProfileId}`, 'GET', undefined);
    }

    /**
     * TODO: Please comment this method
     * @param searchProfile
     */
    async updateSearchProfile(searchProfile: SearchprofileServiceTypes.Searchprofile): Promise<AxiosResponse<SearchprofileServiceTypes.Searchprofile>> {
        return this.invokeApi(`/search-profiles/${searchProfile.id}`, 'PUT', searchProfile);
    }

    /**
     * TODO: Please comment this method
     * @param searchProfileId
     */
    async deleteSearchProfile(searchProfileId: string): Promise<AxiosResponse> {
        return this.invokeApi(`/search-profiles/${searchProfileId}`, 'DELETE', undefined);
    }
}

export default new SearchProfileService();
