import { APIClient, APIMapping } from '../http';
import { AxiosResponse } from "axios";

export class InteractiveExposeStatisticsService extends APIClient {
    constructor() {
        super(APIMapping.interactiveExposeStatisticsService);
    }

    /**
     * Returns the filled statistics data Object for a specific estate
     * @param {string} estateId
     * @returns {Promise<AxiosResponse>}
     */
    getEstateStatistics(estateId: string) : Promise<AxiosResponse> {
        return this.invokeApi('/estateStatistics', 'GET', undefined, {
            queryParams: {
                estateId
            }
        });
    }

}

export default new InteractiveExposeStatisticsService();