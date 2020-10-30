import { APIClient, APIMapping } from '../../http';
import { InteractiveExposeStatisticsServiceTypes } from './InteractiveExposeStatisticsService.Types';
import OpenCountStatistic = InteractiveExposeStatisticsServiceTypes.OpenCountStatistic;
import DwellTimeStatistic = InteractiveExposeStatisticsServiceTypes.DwellTimeStatistic;

export class StatisticsController extends APIClient {

    constructor() {
        super(APIMapping.interactiveExposeStatisticsService);
    }

    /**
     * Returns the filled statistics data Object for a specific estate
     * @param {string} estateId
     */
    async fetchEstateStatistics(estateId: string) {
        return await this.invokeApiWithErrorHandling('/estateStatistics', 'GET', undefined, {
            queryParams: {
                estateId,
            },
        });
    }

    /**
     * Counts all iex which were sent for en estate.
     * @param estateId
     * @param singleCount represent the boolean if only contacts to whom iex was sent should be counted,
     *          or all sent iex including same contacts.
     */
    async fetchSentInteractiveExposeCount(estateId: string, singleCount?: boolean){
        return await this.invokeApiWithErrorHandling(
            `/estateStatistics/${estateId}/sent/count`,
            'GET',
            undefined,
            singleCount != null
                ? {
                    queryParams: {
                        singleCount,
                    },
                }
                : {}
        );
    }

    /**
     * Aggregates different statistics data for given estate by given statistics types.
     * @param estateId
     * @param requestedTypes represents a list with statistic types
     */
    async fetchDynamicEstateStatistics(estateId: string, requestedTypes: object) {
        return await this.invokeApiWithErrorHandling<(OpenCountStatistic | DwellTimeStatistic)[]>(`/dynamic/${estateId}`, 'POST', requestedTypes);
    }
}
