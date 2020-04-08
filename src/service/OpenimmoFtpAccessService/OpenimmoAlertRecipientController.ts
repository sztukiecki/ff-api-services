import { APIClient, APIMapping } from '../../http';
import { OpenImmoAlertRecipientTypes } from './OpenimmoAlertRecipientService.Types';
import OpenimmoAlertRecipient = OpenImmoAlertRecipientTypes.OpenimmoAlertRecipient;

export default class OpenimmoAlertRecipientsController extends APIClient {

    constructor() {
        super(APIMapping.openimmoFtpAccessService);
    }

    /**
     * get all global alert recipients
     */
    async fetchAll() {
        return await this.invokeApiWithErrorHandling<OpenimmoAlertRecipient[]>('/alert', 'GET', undefined);
    }

    /**
     * get one alert recipient
     * @param id
     */
    async fetch(id: string) {
        return await this.invokeApiWithErrorHandling<OpenimmoAlertRecipient>(`/alert/${id}`, 'GET');
    }

    /**
     * update an alert recipient
     * @param id
     * @param recipient
     */
    async update(id: string, recipient: OpenimmoAlertRecipient) {
        return await this.invokeApiWithErrorHandling<OpenimmoAlertRecipient>(`/ftp/${id}`, 'PUT', recipient);
    }

    /**
     * create an alert recipient
     * @param recipient
     */
    async create(recipient: OpenimmoAlertRecipient) {
        return await this.invokeApiWithErrorHandling<OpenimmoAlertRecipient>('/alert', 'POST', recipient);
    }

    /**
     * delete an alert recipient
     * @param id
     */
    async delete(id: string) {
        return await this.invokeApiWithErrorHandling<OpenimmoAlertRecipient>(`/alert/${id}`, 'DELETE');
    }
}
