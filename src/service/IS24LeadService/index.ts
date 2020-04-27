import IS24LeadsController from './IS24LeadsController';

export * from './IS24LeadService.Types';

export class IS24LeadService {

    public readonly leads: IS24LeadsController;

    constructor() {
        this.leads = new IS24LeadsController();
    }
}

export const IS24LeadServiceInstance = new IS24LeadService();