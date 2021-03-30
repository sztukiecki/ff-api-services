import { APIClient, APIMapping } from '../../http';
import { EverSignServiceTypes } from './EverSignService.Types';

export class SignController extends APIClient {
    constructor() {
        super(APIMapping.everSignService);
    }

    async create(digitalSignatureTask: EverSignServiceTypes.DigitalSignatureTask) {
        return this.invokeApiWithErrorHandling(`/sign`, 'POST', digitalSignatureTask);
    }
}
