import { APIClient, APIMapping } from '../../http';
import { OpenImmoReportRecipientTypes } from './OpenimmoAlertRecipientService.Types';
import OpenimmoReportRecipient = OpenImmoReportRecipientTypes.OpenimmoReportRecipient;

export default class OpenimmoReportRecipientsController extends APIClient {

    constructor() {
        super(APIMapping.openimmoFtpAccessService);
    }

    /**
     * get all global alert recipients
     */
    async fetchAll() {
        return await this.invokeApiWithErrorHandling<{ recipients: OpenimmoReportRecipient[] }>('/alert', 'GET', undefined);
    }

    /**
     * update all alert recipients
     * @param recipients
     */
    async put(recipients: OpenimmoReportRecipient[]) {
        return await this.invokeApiWithErrorHandling<{ recipients: OpenimmoReportRecipient[] }>(`/alert`, 'PUT', { recipients });
    }
}
