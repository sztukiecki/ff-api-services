import { APIClient, APIMapping } from '../../http';
import { PagedResponse } from '@flowfact/types';
import { MatchmakingTypes } from './Matchmaking.Types';
import { Sort } from '@flowfact/node-flowdsl';

export default class MatchController extends APIClient {

    constructor() {
        super(APIMapping.matchmakingService);
    }

    /**
     * Fetch matches for a given search profile id
     * @param searchProfileId
     * @param size
     * @param offset
     */
    async fetchMatchesBySearchProfile(searchProfileId: string, query: MatchmakingTypes.EstatesBySearchProfileQuery = {}, sorting: Sort[] = [], size: number = 10, offset: number = 0) {
        // converts sorting to a string like "+fieldName,-fieldName2"
        const sort: string = sorting.map(item => ((item.direction === 'ASC' ? '+' : '-') + item.field)).join(',');
        return await this.invokeApiWithErrorHandling<PagedResponse<MatchmakingTypes.MatchedEstate>>(`/match/search-profile/${searchProfileId}`, 'GET', undefined, {
            queryParams: { ...query, size, offset, ...(sort && { sort }) },
        });
    }

    /**
     * Fetch matches for a given estate id
     * @param estateId
     * @param size
     * @param offset
     */
    async fetchMatchesByEstate(estateId: string, size: number = 10, offset: number = 0) {
        return await this.invokeApiWithErrorHandling<PagedResponse<MatchmakingTypes.MatchedSearchProfile>>(`/match/estate/${estateId}`, 'GET', undefined, {
            queryParams: { size, offset },
        });
    }
}
