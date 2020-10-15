import { APIClient, APIMapping } from '../../http';
import { ProofOfActivityServiceTypes } from './ProofOfActivityService.Types';
import ActivitiesResponse = ProofOfActivityServiceTypes.Activities.ActivitiesResponse;
import EntityIdData = ProofOfActivityServiceTypes.EntityIdData;
import DateRange = ProofOfActivityServiceTypes.DateRange;
import ActivityResponse = ProofOfActivityServiceTypes.Activities.ActivityResponse;

export class ActivitiesController extends APIClient {
    constructor() {
        super(APIMapping.proofOfActivityService);
    }

    /**
     * Returns all proofs of activity as a paged result
     * @param lastId
     * @param size
     */
    async fetchActivities(lastId?: string, size?: number) {
        return this.invokeApiWithErrorHandling<ActivitiesResponse>('/', 'GET', {
            lastId,
            size
        });
    }

    async fetchActivityData(id: string, entity: EntityIdData, dateRange: DateRange) {
        return this.invokeApiWithErrorHandling<ActivityResponse>(`/${id}/data`, 'POST', {
            dateRange,
            entity
        });
    }
}
