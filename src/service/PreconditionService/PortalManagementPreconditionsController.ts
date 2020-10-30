import { APIClient, APIMapping } from "../../http";
import { PreconditionServiceTypes } from "./PreconditionsService.Types";

export class PortalManagementPreconditionsController extends APIClient {
    constructor() {
        super(APIMapping.portalManagementService);
    }

    async fetchPreconditions() {
        return this.invokeApiWithErrorHandling<PreconditionServiceTypes.Precondition>('/preconditions/authenticatedPortal', 'GET');
    }
}
