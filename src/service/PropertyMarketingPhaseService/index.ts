import { PhasesController } from './PhasesController';

export * from './PropertyMarketingPhaseService.Types';

export class PropertyMarketingPhaseService {
    public readonly phases: PhasesController;

    constructor() {
        this.phases = new PhasesController();
    }
}

export const PropertyMarketingPhaseServiceInstance = new PropertyMarketingPhaseService();
