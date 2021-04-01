import { TeamsIntegrationController } from './TeamsIntegrationController';

export * from './TeamsService.Types';

export class TeamsService {
    public readonly integration: TeamsIntegrationController;

    constructor() {
        this.integration = new TeamsIntegrationController();
    }
}

export const TeamsServiceInstance = new TeamsService();
