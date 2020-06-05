import { AxiosResponse } from 'axios';
import { APIClient, APIMapping } from '../../http';
import { IS24ImportServiceTypes } from './IS24ImportService.Types';
import IS24Property = IS24ImportServiceTypes.IS24Property;
import PossibleUser = IS24ImportServiceTypes.PossibleUser;

export default class IS24ImportContoller extends APIClient {

    constructor() {
        super(APIMapping.is24ImportService);
    }

    /**
     * Fetches all properties (estates, garages, plots, etc...) of a authenticated is24 portal
     * @param portalId
     * @param page
     * @param pageSize
     */
    async fetchProperties(portalId: string, page: number = 1, pageSize: number = 10): Promise<AxiosResponse<{
        entities: IS24Property[],
        totalCount: number;
        page: number;
    }>> {
        return this.invokeApi(`/${portalId}/previews`, 'GET', undefined, {
            queryParams: {
                page: page,
                pageSize: pageSize
            }
        });
    }

    /**
     * Imports is24 properties into the FLOWFACT platform
     * @param portalId
     * @param propertyIds
     */
    async importProperties(portalId: string, propertyIds: string[]): Promise<AxiosResponse> {
        return await this.invokeApi(`/${portalId}/import`, 'POST', {
            is24EstateIds: propertyIds
        });
    }

    /**
     * Fetches possible users. A possible user can be a contact person of a estate
     * @param portalId
     */
    async fetchPossibleUsers(portalId: string): Promise<AxiosResponse<{ users: PossibleUser[] }>> {
        return await this.invokeApi(`/${portalId}/possibleUsers`, 'GET');
    }

    /**
     * Trigger import of developer projects
     * @param portalId
     */
    async importDeveloperProjects(portalId: string): Promise<AxiosResponse> {
        return await this.invokeApi(`/portals/${portalId}/import-projects`, 'POST');
    }

}