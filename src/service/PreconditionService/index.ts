import { PortalManagementPreconditionsController } from './PortalManagementPreconditionsController';
import { NylasPreconditionController } from "./NylasPreconditionController";

export * from './PreconditionsService.Types';

export class PreconditionService {
    public readonly portalManagement: PortalManagementPreconditionsController;
    public readonly nylas: NylasPreconditionController;

    constructor() {
        this.portalManagement = new PortalManagementPreconditionsController();
        this.nylas = new NylasPreconditionController();
    }
}

export const PreconditionsServiceInstance = new PreconditionService();
