import { APIClient, APIMapping } from '../../http';
import { IS24ImportServiceTypes } from './IS24ImportService.Types';
import IS24Property = IS24ImportServiceTypes.IS24Property;
import PossibleUser = IS24ImportServiceTypes.PossibleUser;

export interface PagedResponse<T> {
    entities: T[];
    totalCount: number;
    page: number;
    size: number;
}

export default class IS24ImportController extends APIClient {
    constructor() {
        super(APIMapping.is24ImportService);
    }

    /**
     * Fetches all properties (estates, garages, plots, etc...) of a authenticated is24 portal
     * @param portalId
     * @param page
     * @param pageSize
     */
    async fetchProperties(portalId: string, page: number = 1, pageSize: number = 10) {
        return this.invokeApiWithErrorHandling<PagedResponse<IS24Property>>(`/${portalId}/previews`, 'GET', undefined, {
            queryParams: {
                page: page,
                pageSize: pageSize,
            },
        });
    }

    /**
     * Imports is24 properties into the FLOWFACT platform
     * @param portalId
     * @param propertyIds
     */
    async importProperties(portalId: string, propertyIds: string[]) {
        return await this.invokeApiWithErrorHandling(`/${portalId}/import`, 'POST', {
            is24EstateIds: propertyIds,
        });
    }

    /**
     * Fetches possible users. A possible user can be a contact person of a estate
     * @param portalId
     */
    async fetchPossibleUsers(portalId: string) {
        return await this.invokeApiWithErrorHandling<{ users: PossibleUser[] }>(`/${portalId}/possibleUsers`, 'GET');
    }

    /**
     * Trigger import of developer projects
     * @param portalId
     */
    async importDeveloperProjects(portalId: string) {
        return await this.invokeApiWithErrorHandling(`/portals/${portalId}/import-projects`, 'POST');
    }
}
