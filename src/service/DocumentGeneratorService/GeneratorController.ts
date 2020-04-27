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
     * @param saveFormat
     *  undefined means docx
     */
    generate(s3Url: string, entities: EntityDefinition[], userId?: string, saveFormat?: 'pdf' | 'docx') {
        return this.invokeApiWithErrorHandling<{ requestId: string}>('/generator/generate', 'POST', {
            s3Url: s3Url,
            userId: typeof userId === 'string' ? userId : null,
            entities: entities,
            saveFormat: saveFormat
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
