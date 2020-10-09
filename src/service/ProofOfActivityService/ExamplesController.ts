import { APIClient, APIMapping } from '../../http';

export class ExamplesController extends APIClient {
    constructor() {
        super(APIMapping.proofOfActivityService);
    }

    async createExample() {
        return this.invokeApiWithErrorHandling('/examples', 'POST');
    }
}
