import { APIClient, APIMapping } from '../../http';
import { SlackServiceTypes } from './SlackService.Types';
import { EnvironmentManagementInstance } from '../../util/EnvironmentManagement';

export class SlackCredentialsController extends APIClient {
    constructor() {
        super(APIMapping.slackIntegrationService);
    }

    /**
     * Fetches Slack credentials for current user's company
     */
    async fetchCredentials() {
        return this.invokeApiWithErrorHandling<SlackServiceTypes.Credentials>('/credentials', 'GET');
    }

    /**
     * Saves Slack credentials (auth token) of the company
     * @param token
     */
    async addCredentials(token: string) {
        return this.invokeApiWithErrorHandling<SlackServiceTypes.Credentials>('/credentials', 'POST', { token });
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
}
