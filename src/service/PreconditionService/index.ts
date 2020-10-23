import { PortalManagementPreconditionsController } from './PortalManagementPreconditionsController';

export * from './PreconditionsService.Types';

export class PreconditionService {
    public readonly portalManagement: PortalManagementPreconditionsController;

    constructor() {
        this.portalManagement = new PortalManagementPreconditionsController;
    }
}

export const PreconditionsServiceInstance = new PreconditionService();
