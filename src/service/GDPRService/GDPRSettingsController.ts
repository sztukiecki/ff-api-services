import { APIClient, APIMapping } from '../../http';
import { GDPRServiceTypes } from './GDPRService.Types';

export class GDPRSettingsController extends APIClient {
    constructor() {
        super(APIMapping.gdprService);
    }

    /**
     * TODO: Please comment this method
     */
    async fetchSettings() {
        return await this.invokeApiWithErrorHandling<GDPRServiceTypes.CompanySettings>('/settings', 'GET');
    }

    /**
     * TODO: Please comment this method
     * @param settings
     */
    async updateSettings(settings: GDPRServiceTypes.CompanySettings) {
        return await this.invokeApiWithErrorHandling('/settings', 'PUT', settings);
    }
}
