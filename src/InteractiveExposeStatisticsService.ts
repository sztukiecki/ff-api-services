import { APIClient, APIMapping } from './http';
import { AxiosResponse } from 'axios';

export class InteractiveExposeStatisticsService extends APIClient {
    constructor() {
        super(APIMapping.interactiveExposeStatisticsService);
    }

    /**
     * Returns the filled statistics data Object for a specific estate
     * @param {string} estateId
     * @returns {Promise<AxiosResponse>}
     */
    async fetchEstateStatistics(estateId: string): Promise<AxiosResponse> {
        return await this.invokeApi('/estateStatistics', 'GET', undefined, {
            queryParams: {
                estateId
            }
        });
    }

    /**
     * Counts all iex which were sent for en estate.
     * @param estateId
     * @param singleCount represent the boolean if only contacts to whom iex was sent should be counted,
     *          or all sent iex including same contacts.
     */
    async fetchSentInteractiveExposeCount(estateId: string, singleCount?: boolean): Promise<AxiosResponse> {
        return await this.invokeApi(`/estateStatistics/${estateId}/sent/count`, 'GET', undefined, singleCount != null ? {
            queryParams: {
                singleCount
            }
        } : {});
    }

    /**
     * Aggregates different statistics data for given estate by given statistics types.
     * @param estateId
     * @param requestedTypes represents a list with statistic types
     */
    async fetchDynamicEstateStatistics(estateId: string, requestedTypes: object): Promise<AxiosResponse> {
        return await this.invokeApi(`/dynamic/${estateId}`, 'POST', requestedTypes);
    }

}

export default new InteractiveExposeStatisticsService();