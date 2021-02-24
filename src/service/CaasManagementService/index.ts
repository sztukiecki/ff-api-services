import { CaasManagementController } from './CaasManagementController';

export * from './CaasManagementService.Types';

export class CaasManagementService {
    public static instance = new CaasManagementService();

    public readonly caasManagement: CaasManagementController;

    constructor() {
        this.caasManagement = new CaasManagementController();
    }
}

export const CaasManagementServiceInstance = new CaasManagementService();