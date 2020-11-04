import { APIClient, APIMapping } from '../../http';
import { PreconditionServiceTypes } from './PreconditionsService.Types';

export class InquiryPreconditionsController extends APIClient {
    constructor() {
        super(APIMapping.inquiryService);
    }

    async fetchPreconditions() {
        return this.invokeApiWithErrorHandling<PreconditionServiceTypes.Precondition>('/preconditions/inquiriesSetup', 'GET');
    }
}
