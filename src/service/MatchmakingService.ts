import {APIClient, APIMapping} from '../http';
import {AxiosResponse} from 'axios';
import {MatchCount, MatchScore} from '../util/MatchmakingModels';

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
}

export default new MatchmakingService();
