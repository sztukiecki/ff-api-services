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
     */
    generate(s3Url: string, entities: EntityDefinition[]) {
        return this.invokeApiWithErrorHandling<{ requestId: string}>('/generator/generate', 'POST', {
            s3Url: s3Url,
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
