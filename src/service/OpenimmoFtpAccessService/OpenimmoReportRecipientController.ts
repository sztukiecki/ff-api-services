import { APIClient, APIMapping } from '../../http';
import { OpenImmoReportRecipientTypes } from './OpenimmoReportRecipientService.Types';
import OpenimmoReportRecipient = OpenImmoReportRecipientTypes.OpenimmoReportRecipient;
import OpenimmoReportRequestRecipient = OpenImmoReportRecipientTypes.OpenimmoReportRequestRecipient;

export default class OpenimmoReportRecipientsController extends APIClient {

    constructor() {
        super(APIMapping.openimmoFtpAccessService);
    }

    /**
     * get all global alert recipients
     */
    async fetchAll() {
        return await this.invokeApiWithErrorHandling<{ recipients: OpenimmoReportRecipient[] }>('/report', 'GET');
    }

    /**
     * update all alert recipients
     * @param recipients
     */
    async updateReportRecipients(recipients: OpenimmoReportRequestRecipient[]) {
        return await this.invokeApiWithErrorHandling<{ recipients: OpenimmoReportRecipient[] }>(`/report`, 'PUT', { recipients });
    }
}
