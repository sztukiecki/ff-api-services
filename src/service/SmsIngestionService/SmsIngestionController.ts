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

}
