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
    async fetchActivities(smsData: SmsIngestionServiceTypes.SmsData) {
        return this.invokeApiWithErrorHandling('/send', 'POST', smsData);
    }
}
