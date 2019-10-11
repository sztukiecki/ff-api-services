import { AxiosResponse } from 'axios';
import { APIClient, APIMapping } from '../http';

export class SearchProfileService extends APIClient {
    constructor() {
        super(APIMapping.searchProfileService);
    }

    /**
     * TODO: Please comment this method
     * @param schemaGroup
     * @param schema
     */
    async fetchSearchProfileTemplate(schemaGroup: string, schema: string) : Promise<AxiosResponse> {
        return this.invokeApi(`/search-profiles/template/${schemaGroup}/${schema}`, 'GET');
    }

    /**
     * TODO: Please comment this method
     * @param page
     * @param size
     */
    async fetchAllSearchProfiles(page: number = 1, size: number = 10) : Promise<AxiosResponse> {
        const queryParams: any = {
            page: page.toString(),
            size: size.toString()
        };
        return this.invokeApi(`/search-profiles`, 'GET', undefined, { queryParams });
    }

    /**
     * TODO: Please comment this method
     * @param searchProfile
     */
    async createSearchProfile(searchProfile: any) : Promise<AxiosResponse> {
        return this.invokeApi(`/search-profiles`, 'POST', searchProfile);
    }

    /**
     * TODO: Please comment this method
     * @param searchProfileId
     */
    async fetchSearchProfile(searchProfileId: string) : Promise<AxiosResponse> {
        return this.invokeApi(`/search-profiles/${searchProfileId}`, 'GET', undefined);
    }

    /**
     * TODO: Please comment this method
     * @param searchProfile
     */
    async updateSearchProfile(searchProfile: any) : Promise<AxiosResponse> {
        return this.invokeApi(`/search-profiles/${searchProfile.id}`, 'PUT', searchProfile);
    }

    /**
     * TODO: Please comment this method
     * @param searchProfileId
     */
    async deleteSearchProfile(searchProfileId: string) : Promise<AxiosResponse> {
        return this.invokeApi(`/search-profiles/${searchProfileId}`, 'DELETE', undefined);
    }
}

export default new SearchProfileService();