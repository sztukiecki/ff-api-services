import { APIClient, APIMapping } from '../../http';
import { SlackServiceTypes } from './SlackService.Types';

export class SlackCompanyIntegrationSettingsController extends APIClient {

    constructor() {
        super(APIMapping.slackIntegrationService);
    }

    async fetchSettings() {
        return this.invokeApiWithErrorHandling('/companyIntegrationSettings', 'GET');
    }

    async postSettings(slackConfiguration: SlackServiceTypes.SlackConfiguration) {
        return this.invokeApiWithErrorHandling('/companyIntegrationSettings', 'POST', slackConfiguration);
    }

    async deleteSettings() {
        return this.invokeApiWithErrorHandling('/companyIntegrationSettings', 'DELETE');
    }
}
