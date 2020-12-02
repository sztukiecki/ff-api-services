import { APIClient, APIMapping } from '../../http';
import { ProofOfActivityServiceTypes } from './ProofOfActivityService.Types';

import TemplatesResponse = ProofOfActivityServiceTypes.Templates.TemplatesResponse;

export class TemplatesController extends APIClient {
    constructor() {
        super(APIMapping.proofOfActivityService);
    }

    /**
     * Get all templates as a paged result
     * @param lastId
     * @param size
     */
    async fetchTemplates(lastId?: string, size?: number) {
        return this.invokeApiWithErrorHandling<TemplatesResponse>('/template', 'GET', {
            lastId,
            size,
        });
    }
}
