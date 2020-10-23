import { APIClient, APIMapping } from "../../http";
import { Preconditions } from "./PreconditionsService.Types";

export class PortalManagementPreconditionsController extends APIClient {
    constructor() {
        super(APIMapping.portalManagementService);
    }

    async fetchPreconditions() {
        return this.invokeApiWithErrorHandling<Preconditions>('/preconditions', 'GET');
    }
}
