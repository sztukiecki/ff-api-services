import { APIClient, APIMapping } from '../../http';
import { SlackServiceTypes } from './SlackService.Types';

export class SlackIntegrationController extends APIClient {

    constructor() {
        super(APIMapping.slackIntegrationService);
    }

    async postMessage(postMessageRequest: SlackServiceTypes.PostMessageRequest) {
        return this.invokeApiWithErrorHandling('/slack/postMessage', 'POST', postMessageRequest);
    }

    async createChannel(createChannelRequest: SlackServiceTypes.CreateChannelRequest) {
        return this.invokeApiWithErrorHandling('/slack/createChannel', 'POST', createChannelRequest);
    }

    async deleteChannel(deleteChannelRequest: SlackServiceTypes.DeleteChannelRequest) {
        return this.invokeApiWithErrorHandling('/slack/deleteChannel', 'POST', deleteChannelRequest);
    }

    async oAuthAccess(oAuthAccessRequest: SlackServiceTypes.OAuthAccessRequest) {
        return this.invokeApiWithErrorHandling('/slack/oauthAccess', 'POST', oAuthAccessRequest);
    }
}
