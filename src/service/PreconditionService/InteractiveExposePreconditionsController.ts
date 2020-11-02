import { APIClient, APIMapping } from '../../http';
import { PreconditionServiceTypes } from './PreconditionsService.Types';

export class InteractiveExposePreconditionsController extends APIClient {
    constructor() {
        super(APIMapping.interactiveExposeService);
    }

    async fetchPreconditions() {
        return this.invokeApiWithErrorHandling<PreconditionServiceTypes.Precondition>('/preconditions/interactiveExposeSetup', 'GET');
    }
}
