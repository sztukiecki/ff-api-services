import { ConversationsController } from './ConversationsController';

export * from './TeamsIntegrationServiceTypes';

export class TeamsIntegrationService {
    public readonly conversations: ConversationsController;

    constructor() {
        this.conversations = new ConversationsController();
    }
}

export const TeamsIntegrationServiceInstance = new TeamsIntegrationService();
