import { APIClient, APIMapping } from '../../http';
import { EntitlementServiceTypes } from './EntitlementService.Types';

export class EntitlementController extends APIClient {
    constructor() {
        super(APIMapping.entitlementService);
    }
    /**
     *
     * returns entitlement object information about the given company
     *
     * @param companyId
     */
    getEntitlements(companyId: string) {
        return this.invokeApiWithErrorHandling<EntitlementServiceTypes.EntitlementResponse>('/getEntitlements', 'GET', undefined, {});
    }
}
