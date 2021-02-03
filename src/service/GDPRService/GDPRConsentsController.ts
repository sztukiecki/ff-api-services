import { APIClient, APIMapping } from '../../http';
import { GDPRServiceTypes } from './GDPRService.Types';

export class GDPRConsentsController extends APIClient {
    constructor() {
        super(APIMapping.gdprService);
    }

    /**
     * TODO: Please comment this method
     * @param consentEntity
     */
    async addConsent(consentEntity: GDPRServiceTypes.ConsentData) {
        return await this.invokeApiWithErrorHandling<Pick<GDPRServiceTypes.ConsentData, 'id'>>('/consents', 'POST', consentEntity);
    }

    /**
     * TODO: returns
     * @param body
     */
    async fetchConsentForContacts(body: GDPRServiceTypes.ConsentRequestBody) {
        return await this.invokeApiWithErrorHandling<GDPRServiceTypes.ConsentByContact>('/consents/forContacts', 'POST', body);
    }

    /**
     * TODO: Please comment this method
     * @param contactId
     */
    async fetchConsentStatus(contactId: string) {
        return await this.invokeApiWithErrorHandling<GDPRServiceTypes.ConsentStatus>('/consents/status', 'GET', undefined, {
            queryParams: {
                contactId: contactId,
            },
        });
    }

    /**
     * TODO: Please comment this method
     * @param contactId
     */
    async sendConsentMail(contactId: string) {
        return await this.invokeApiWithErrorHandling(`/consents/mail/${contactId}`, 'POST');
    }

    /**
     * TODO: Please comment this method
     * @deprecated
     * @param consentId
     */
    async fetchConsentAuthor(consentId: string) {
        return await this.invokeApiWithErrorHandling<string>(`/consents/${consentId}/author`, 'GET');
    }
}
