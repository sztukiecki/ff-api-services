import { APIClient, APIMapping } from '../../http';
import {SmsIngestionServiceTypes} from "./SmsIngestionService.Types";

export class SmsIngestionController extends APIClient {
    constructor() {
        super(APIMapping.smsIngestionService);
    }

    /**
     * Sends the SMS message
     * @param smsData
     */
    async sendSms(smsData: SmsIngestionServiceTypes.SmsData) {
        return this.invokeApiWithErrorHandling<void>('/send', 'POST', smsData);
    }

    /**
     * Fetches sms api credentials for given companyId
     * @param companyId
     */
    async fetchCredentials(companyId: string) {
        return this.invokeApiWithErrorHandling<SmsIngestionServiceTypes.Credentials>(`/credentials/${companyId}`, 'GET');
    }
}
