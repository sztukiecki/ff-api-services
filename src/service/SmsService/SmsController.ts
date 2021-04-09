import { APIClient, APIMapping } from '../../http';
import { SmsServiceTypes } from './SmsService.Types';

export class SmsController extends APIClient {
    constructor() {
        super(APIMapping.smsService);
    }

    /**
     * Fetches sms api credentials for current user company
     */
    async fetchCredentials() {
        return this.invokeApiWithErrorHandling<SmsServiceTypes.Credentials>(`/credentials`, 'GET');
    }

    /**
     * Saves SMS API credentials of the company
     * @param token
     */
    async saveCredentials(token: string) {
        return this.invokeApiWithErrorHandling<SmsServiceTypes.Credentials>(`/credentials`, 'POST', { token });
    }

    /**
     * Removes SMS API credentials of the company
     */
    async deleteCredentials() {
        return this.invokeApiWithErrorHandling(`/credentials`, 'DELETE');
    }
}
