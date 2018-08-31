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

	/**
     * Counts all iex which were sent for en estate.
	 * @param estateId
	 * @param singleCount represent the boolean if only contacts to whom iex was sent should be counted,
	 *          or all sent iex including same contacts.
	 */
	getSentInteractiveExposeCount(estateId: string, singleCount?: boolean) : Promise<AxiosResponse> {
		return this.invokeApi(`/${estateId}/sent/count`, 'GET', undefined, singleCount != null ? {
			queryParams: {
				singleCount
			}
        } : {});
	}

}

export default new InteractiveExposeStatisticsService();