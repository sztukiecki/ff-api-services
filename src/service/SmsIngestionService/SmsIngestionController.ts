import { APIClient, APIMapping } from '../../http';
import {SmsIngestionServiceTypes} from "./SmsIngestionService.Types";

export class SmsIngestionController extends APIClient {
    constructor() {
        super(APIMapping.smsIngestionService);
    }

    /**
     * Sends the message
     * @param messageRequest
     */
    async send(messageRequest: SmsIngestionServiceTypes.TextMessageRequest) {
        return this.invokeApiWithErrorHandling<void>('/send', 'POST', messageRequest);
    }

}
