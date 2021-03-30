import { SlackCredentialsController } from './SlackCredentialsController';
import { SlackIntegrationController } from './SlackIntegrationController';

export * from './SlackService.Types';

export class SlackService {
    public readonly credentials: SlackCredentialsController;
    public readonly integration: SlackIntegrationController;

    constructor() {
        this.credentials = new SlackCredentialsController();
        this.integration = new SlackIntegrationController();
    }
}

export const SlackServiceInstance = new SlackService();
