import { APIClient, APIMapping } from '../../http';
import { InteractiveExposeStatisticsServiceTypes } from './InteractiveExposeStatisticsService.Types';
import OpenCountStatistic = InteractiveExposeStatisticsServiceTypes.OpenCountStatistic;
import DwellTimeStatistic = InteractiveExposeStatisticsServiceTypes.DwellTimeStatistic;

export class StatisticsController extends APIClient {

    constructor() {
        super(APIMapping.interactiveExposeStatisticsService);
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
