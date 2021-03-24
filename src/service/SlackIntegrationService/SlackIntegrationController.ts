import { APIClient, APIMapping } from '../../http';
import { SlackIntegrationServiceTypes } from './SlackIntegrationService.Types';
import { EnvironmentManagementInstance } from '../../util/EnvironmentManagement';

export class SlackIntegrationController extends APIClient {
    constructor() {
        super(APIMapping.slackIntegrationService);
    }

    /**
     * Fetches Slack credentials for current user's company
     */
    async fetchCredentials() {
        return this.invokeApiWithErrorHandling<SlackIntegrationServiceTypes.Credentials>('/credentials', 'GET');
    }

    /**
     * Saves Slack credentials (auth token) of the company
     * @param token
     */
    async addCredentials(token: string) {
        return this.invokeApiWithErrorHandling<SlackIntegrationServiceTypes.Credentials>('/credentials', 'POST', { token });
    }

    /**
     * Removes Slack credentials (auth token) of the company
     */
    async deleteCredentials() {
        return this.invokeApiWithErrorHandling('/credentials', 'DELETE');
    }

    /**
     * Returns uri for redirection after user goes through the Slack app installation UI
     * and okays the app with all the scopes that it requests
     */
    slackAuthCodeRedirectUri() {
        return `${EnvironmentManagementInstance.getBaseUrl()}/${APIMapping.slackIntegrationService.name}/public/oauth/callback`;
    }

    async postMessage(postMessageRequest: SlackIntegrationServiceTypes.PostMessageRequest) {
        return this.invokeApiWithErrorHandling('/slack/postMessage', 'POST', postMessageRequest);
    }

    async createChannel(createChannelRequest: SlackIntegrationServiceTypes.CreateChannelRequest) {
        return this.invokeApiWithErrorHandling('/slack/createChannel', 'POST', createChannelRequest);
    }

    async deleteChannel(deleteChannelRequest: SlackIntegrationServiceTypes.DeleteChannelRequest) {
        return this.invokeApiWithErrorHandling('/slack/deleteChannel', 'POST', deleteChannelRequest);
    }

    async oAuthAccess(oAuthAccessRequest: SlackIntegrationServiceTypes.OAuthAccessRequest) {
        return this.invokeApiWithErrorHandling('/slack/oauthAccess', 'POST', oAuthAccessRequest);
    }

    async fetchSettings() {
        return this.invokeApiWithErrorHandling('/companyIntegrationSettings', 'GET');
    }

    async postSettings(slackConfiguration: SlackIntegrationServiceTypes.SlackConfiguration) {
        return this.invokeApiWithErrorHandling('/companyIntegrationSettings', 'POST', slackConfiguration);
    }

    async deleteSettings() {
        return this.invokeApiWithErrorHandling('/companyIntegrationSettings', 'DELETE');
    }
}
