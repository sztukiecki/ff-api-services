import { APIClient, APIMapping } from '../../http';
import { EntityDefinition, GenerationStatus } from './DocumentGeneratorService.Types';

export class GeneratorController extends APIClient {

    constructor() {
        super(APIMapping.documentGeneratorService);
    }

    /**
     * Generates a document
     * @param s3Url
     * @param entities
     * @param userId
     *  The user id for the placeholder-service
     */
    generate(s3Url: string, entities: EntityDefinition[], userId?: string) {
        return this.invokeApiWithErrorHandling<{ requestId: string}>('/generator/generate', 'POST', {
            s3Url: s3Url,
            userId: typeof userId === 'string' ? userId : null,
            entities: entities
        });
    }

    /**
     * Fetches the status of a given requestId
     * @param requestId
     */
    fetchStatus(requestId: string) {
        return this.invokeApiWithErrorHandling<GenerationStatus>(`/generator/status/${requestId}`, 'GET');
    }
}
