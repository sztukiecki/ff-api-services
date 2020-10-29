import { PortalManagementPreconditionsController } from './PortalManagementPreconditionsController';
import { NylasPreconditionController } from "./NylasPreconditionController";
import {InteractiveExposePreconditionsController} from "./InteractiveExposePreconditionsController";

export * from './PreconditionsService.Types';

export class PreconditionService {
    public readonly portalManagement: PortalManagementPreconditionsController;
    public readonly nylas: NylasPreconditionController;
    public readonly interactiveExpose: InteractiveExposePreconditionsController;

    constructor() {
        this.portalManagement = new PortalManagementPreconditionsController();
        this.nylas = new NylasPreconditionController();
        this.interactiveExpose = new InteractiveExposePreconditionsController();
    }
}

export const PreconditionsServiceInstance = new PreconditionService();
