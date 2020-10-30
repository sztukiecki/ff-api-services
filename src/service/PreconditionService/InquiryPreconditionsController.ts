import { APIClient, APIMapping } from "../../http";
import { PreconditionServiceTypes } from "./PreconditionsService.Types";

export class InquiryPreconditionsController extends APIClient {
    constructor() {
        super(APIMapping.inquiryService);
    }

    async fetchPreconditions() {
        return this.invokeApiWithErrorHandling<PreconditionServiceTypes.Preconditions>('/preconditions', 'GET');
    }

    async fetchAuthenticatedPortalPrecondition() {
        return this.invokeApiWithErrorHandling<PreconditionServiceTypes.Preconditions>('/preconditions/authenticatedPortal', 'GET');
    }

    async fetchActiveInquiryAutomationPrecondition() {
        return this.invokeApiWithErrorHandling<PreconditionServiceTypes.Preconditions>('/preconditions/activeInquiryAutomation', 'GET');
    }

    async fetchActiveMailAccountPrecondition() {
        return this.invokeApiWithErrorHandling<PreconditionServiceTypes.Preconditions>('/preconditions/activeMailAccount', 'GET');
    }
}
