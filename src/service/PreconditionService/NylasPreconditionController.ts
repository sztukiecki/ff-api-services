import { APIClient, APIMapping } from "../../http";
import { Precondition } from "./PreconditionsService.Types";

export class NylasPreconditionController extends APIClient {
    constructor() {
        super(APIMapping.nylasService);
    }

    async fetchPreconditions() {
        return this.invokeApiWithErrorHandling<Precondition>('/preconditions/activeMailAccount', 'GET');
    }
}
