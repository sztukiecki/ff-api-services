import { AxiosResponse } from 'axios';
import { APIClient, APIMapping } from '../http';
import { Contact } from '../util/ContactModels';
import { MatchCountForEstate, MatchmakingPagingResponse, MatchScore } from '../util/MatchmakingModels';

export class MatchmakingService extends APIClient {

    constructor() {
        super(APIMapping.matchmakingService);
    }


    getAllMatches(): Promise<AxiosResponse<MatchmakingPagingResponse<Array<Contact>>>> {
        return this.invokeApi('/matches', 'GET');
    }

    getMatchesByContact(contactId: string): Promise<AxiosResponse<MatchmakingPagingResponse<Array<MatchScore>>>> {
        return this.invokeApi('/matches/contact/' + contactId, 'GET');
    }

    getMatchesByEstate(estateId: string): Promise<AxiosResponse<MatchmakingPagingResponse<Array<MatchScore>>>> {
        return this.invokeApi('/matches/estate/' + estateId, 'GET');
    }

    getMatchCountByEstate(estateId: string): Promise<AxiosResponse<MatchCountForEstate>> {
        return this.invokeApi(`/matches/estate/${estateId}/count`, 'GET');
    }

    initialImport(): Promise<AxiosResponse> {
        return this.invokeApi('/trigger/initial', 'POST');
    }
}

export default new MatchmakingService();
