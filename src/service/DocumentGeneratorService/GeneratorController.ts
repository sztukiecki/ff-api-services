import { APIClient, APIMapping } from '../../http';
import { EntityDefinition, GenerationStatus, SaveFormat } from './DocumentGeneratorService.Types';

interface GenerateParameters {
    s3Url: string;
    entities: EntityDefinition[];
    userId?: string;
    saveFormat: SaveFormat;
    fileName?: string;
}

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
     * @param fileName
     *  The fileName for the storage on the s3
     */
    // s3Url: string, entities: EntityDefinition[], userId?: string, saveFormat?: 'pdf' | 'docx'
    generate({ s3Url, entities, userId, saveFormat = 'pdf', fileName }: GenerateParameters) {
        return this.invokeApiWithErrorHandling<{ requestId: string}>('/generator/generate', 'POST', {
            s3Url: s3Url,
            userId: typeof userId === 'string' ? userId : null,
            entities: entities,
            saveFormat: saveFormat,
            fileName: fileName
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
