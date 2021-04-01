import { APIClient, APIMapping } from '../../http';
import { TeamsIntegrationServiceTypes } from './TeamsIntegrationServiceTypes';

export class ConversationsController extends APIClient {
    constructor() {
        super(APIMapping.teamsIntegrationService);
    }

    /**
     * Fetch Teams conversation
     */
    async fetchConversation(id: string) {
        return this.invokeApiWithErrorHandling<TeamsIntegrationServiceTypes.Conversation>(`/conversations/${id}`);
    }
}
