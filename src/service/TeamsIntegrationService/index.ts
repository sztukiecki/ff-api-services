import { TeamsIntegrationController } from './TeamsIntegrationController';

export * from './TeamsIntegrationServiceTypes';

export class TeamsIntegrationService {
    public readonly integration: TeamsIntegrationController;

    constructor() {
        this.integration = new TeamsIntegrationController();
    }
}

export const TeamsIntegrationServiceInstance = new TeamsIntegrationService();
