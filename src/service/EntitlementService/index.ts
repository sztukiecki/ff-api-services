export * from './EntitlementService.Types';

import { EntitlementController } from './EntitlementController';

export class EntitlementService {
    public readonly entitlement: EntitlementController;

    constructor() {
        this.entitlement = new EntitlementController();
    }
}

export const EntitlementServiceInstance = new EntitlementService();
