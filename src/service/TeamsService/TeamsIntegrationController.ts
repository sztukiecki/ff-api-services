import { APIClient, APIMapping } from '../../http';
import { TeamsServiceTypes } from './TeamsService.Types';
import Conversation = TeamsServiceTypes.Conversation;

export class TeamsIntegrationController extends APIClient {
    constructor() {
        super(APIMapping.teamsIntegrationService);
    }

    /**
     * Fetch Teams conversation
     */
    async fetchConversation(id: string) {
        return this.invokeApiWithErrorHandling<Conversation>(`/conversations/${id}`);
    }
}
