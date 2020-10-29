import { APIClient, APIMapping } from "../../http";
import { Precondition } from "./PreconditionsService.Types";

export class InteractiveExposePreconditionsController extends APIClient {
    constructor() {
        super(APIMapping.interactiveExposeService);
    }

    async fetchPreconditions() {
        return this.invokeApiWithErrorHandling<Precondition>('/preconditions/interactiveExposeSetup', 'GET');
    }
}
