import {AxiosResponse} from 'axios';
import {APIClient, APIMapping} from '../http';

export class SearchProfileService extends APIClient {

    constructor() {
        super(APIMapping.searchProfileService);
    }

    getMatchmakingRelevantFieldsBySchema(schemaId: string): Promise<AxiosResponse> {
        return this.invokeApi(`/schemas/${schemaId}/fields`, 'GET');
    }

    getMatchmakingResultsForSchemaWithName(schemaName: string): Promise<AxiosResponse> {
        return this.invokeApi(`/matchAll/${schemaName}`, 'GET');
    }

    getCountOfMatchmakingResultsForSchemaWithName(schemaName: string): Promise<AxiosResponse> {
        return this.invokeApi(`/matchCount/${schemaName}`, 'GET');
    }

    getCountOfMatchmakingResultsForSchemaWithNameForEstateWithIdOrIdentifier(schemaName: string, idOrIdentifier: string): Promise<AxiosResponse> {
        return this.invokeApi(`/matchCount/${schemaName}/estate/${idOrIdentifier}`, 'GET');
    }

}

export default new SearchProfileService();
