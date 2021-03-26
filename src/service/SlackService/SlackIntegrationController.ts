import { APIClient, APIMapping } from '../../http';
import { SlackServiceTypes } from './SlackService.Types';
import Channel = SlackServiceTypes.Channel;
import User = SlackServiceTypes.User;

export class SlackIntegrationController extends APIClient {

    constructor() {
        super(APIMapping.slackIntegrationService);
    }

    /**
     * Fetch all Slack channels
     */
    async fetchChannels() {
        return this.invokeApiWithErrorHandling<Channel[]>('/channels');
    }

    /**
     * Fetch all Slack users
     */
    async fetchUsers() {
        return this.invokeApiWithErrorHandling<User[]>('/users');
    }
}
