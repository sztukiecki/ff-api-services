import { APIClient, APIMapping } from "../../http";
import { Precondition } from "./PreconditionsService.Types";

export class PortalManagementPreconditionsController extends APIClient {
    constructor() {
        super(APIMapping.portalManagementService);
    }

    async fetchPreconditions() {
        return this.invokeApiWithErrorHandling<Precondition>('/preconditions/authenticatedPortal', 'GET');
    }
}
