import { APIClient, APIMapping } from '../../http';
import {SmsServiceTypes} from "./SmsService.Types";

export class SmsController extends APIClient {
    constructor() {
        super(APIMapping.smsService);
    }

    /**
     * Fetches sms api credentials for given companyId
     * @param companyId
     */
    async fetchCredentials(companyId: string) {
        return this.invokeApiWithErrorHandling<SmsServiceTypes.Credentials>(`/credentials/${companyId}`, 'GET');
    }
}
