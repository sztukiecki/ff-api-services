import { SlackIntegrationController } from './SlackIntegrationController';

export * from './SlackIntegrationService.Types';

export class SlackIntegrationService {
    public readonly controller: SlackIntegrationController;

    constructor() {
        this.controller = new SlackIntegrationController();
    }
}

export const SlackIntegrationServiceInstance = new SlackIntegrationService();
