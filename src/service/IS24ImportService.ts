import { APIClient, APIMapping } from '../http';
import { AxiosResponse } from 'axios';

export class IS24ImportService extends APIClient {

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
        id: string;
        headline: string;
        type: string;
        mainImageUrl: string;
        city: string;
        price: string;
        zip: string;
        status: 'ACTIVE' | 'INACTIVE' | 'TO_BE_DELETED' | 'DRAFT' | 'ARCHIVED';
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
     * @param propertyIds
     */
    async importProperties(propertyIds: string[]): Promise<AxiosResponse> {
        return await this.invokeApi('/import', 'POST', propertyIds);
    }
}

export default new IS24ImportService();
