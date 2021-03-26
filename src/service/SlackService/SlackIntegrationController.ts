import { APIClient, APIMapping } from '../../http';
import { SlackServiceTypes } from './SlackService.Types';
import ChannelsResponse = SlackServiceTypes.ChannelsResponse;
import SlackUsersResponse = SlackServiceTypes.SlackUsersResponse;

export class SlackIntegrationController extends APIClient {

    constructor() {
        super(APIMapping.slackIntegrationService);
    }

    /**
     * Fetch all Slack channels
     */
    async fetchChannels() {
        return this.invokeApiWithErrorHandling<ChannelsResponse>('/channels');
    }

    /**
     * Fetch all Slack users
     */
    async fetchUsers() {
        return this.invokeApiWithErrorHandling<SlackUsersResponse>('/users');
    }
}
