import { AxiosResponse } from 'axios';
import { APIClient, APIMapping } from '../http';
import { MatchCount, MatchScore } from '../util/MatchmakingModels';

export class MatchmakingService extends APIClient {

    constructor() {
        super(APIMapping.matchmakingService);
    }


    getAllMatches(): Promise<AxiosResponse<Array<MatchCount>>> {
        return this.invokeApi('/matches', 'GET');
    }

    getMatchesByContact(contactId:number): Promise<AxiosResponse<Array<MatchScore>>> {
        return this.invokeApi('/matches/contact/' + contactId, 'GET');
    }

	initialImport(): Promise<AxiosResponse> {
		return this.invokeApi('/trigger/initial', 'POST');
	}
}

export default new MatchmakingService();
