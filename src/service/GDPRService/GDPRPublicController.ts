import { APIClient, APIMapping } from '../../http';
import { GDPRServiceTypes } from './GDPRService.Types';

export class GDPRPublicController extends APIClient {
    constructor() {
        super(APIMapping.gdprService);
    }

    /**
     * TODO: Please comment this method
     * @param token
     */
    async fetchConsentData(token: string) {
        return await this.invokeApiWithErrorHandling<GDPRServiceTypes.ConsentData>('/public/consents/consentdata', 'GET', undefined, {
            queryParams: {
                token: token,
            },
        });
    }

    /**
     * TODO: Please comment this method
     * @param contactId
     * @param userId
     * @param companyId
     */
    async fetchConsents(contactId: string, userId: string, companyId: string) {
        return await this.invokeApiWithErrorHandling<GDPRServiceTypes.Consents>('/public/consents', 'GET', undefined, {
            queryParams: {
                contactId: contactId,
                userId: userId,
                companyId: companyId,
            },
        });
    }

    /**
     * TODO: Please comment this method
     * @param consentId
     * @param consentSchemaId
     * @param userId
     * @param companyId
     */
    async revokeConsent(consentId: string, consentSchemaId: string, userId: string, companyId: string) {
        return await this.invokeApiWithErrorHandling(`/public/consents/schemaId/${consentSchemaId}/entityId/${consentId}/revoke`, 'POST', undefined, {
            queryParams: {
                userId: userId,
                companyId: companyId,
            },
        });
    }

    /**
     * TODO: Please comment this method
     * @param consentEntity
     * @param userId
     * @param companyId
     */
    async createConsent(consentEntity: object, userId: string, companyId: string) {
        return await this.invokeApiWithErrorHandling('/public/consents', 'POST', consentEntity, {
            queryParams: {
                userId: userId,
                companyId: companyId,
            },
        });
    }

    /**
     * TODO: Please comment this method
     * @param userId
     * @param companyId
     */
    async fetchCompanyTerms(userId: string, companyId: string) {
        return await this.invokeApiWithErrorHandling<GDPRServiceTypes.CompanyTerms>('/public/company', 'GET', undefined, {
            queryParams: {
                userId: userId,
                companyId: companyId,
            },
        });
    }

    /**
     * TODO: Please comment this method
     * @param contactId
     * @param companyId
     * @param userId
     */
    async sendNewConsentMail(contactId: string, companyId: string, userId: string) {
        return await this.invokeApiWithErrorHandling('/public/consents/mail', 'POST', undefined, {
            queryParams: {
                companyId: companyId,
                contactId: contactId,
                userId: userId,
            },
        });
    }

    /**
     * TODO: Please comment this method
     * @param contactId
     * @param userId
     * @param companyId
     * @param type
     * @param changes
     */
    async changeData(
        contactId: string,
        userId: string,
        companyId: string,
        type: GDPRServiceTypes.DataChangeRequestType = 'CHANGE',
        changes: object = {}
    ) {
        return await this.invokeApiWithErrorHandling<GDPRServiceTypes.DataChangeRequest>(
            '/public/changeRequests',
            'POST',
            {
                contactId: contactId,
                type: type,
                changes: changes,
            },
            {
                queryParams: {
                    userId: userId,
                    companyId: companyId,
                },
            }
        );
    }

    /**
     * TODO: Please comment this method
     * @param contactId
     * @param userId
     * @param companyId
     */
    async fetchChangeRequestStatus(contactId: string, userId: string, companyId: string) {
        return await this.invokeApiWithErrorHandling<GDPRServiceTypes.DataChangeRequestStatus>('/public/changeRequests/status', 'GET', undefined, {
            queryParams: {
                contactId: contactId,
                userId: userId,
                companyId: companyId,
            },
        });
    }

    /**
     * TODO: Please comment this method
     * @param userId
     * @param companyId
     * @param body
     */
    async exportPersonalData(userId: string, companyId: string, body: GDPRServiceTypes.ExportRequestBody) {
        return await this.invokeApiWithErrorHandling('/public/export', 'POST', body, {
            queryParams: {
                userId: userId,
                companyId: companyId,
            },
        });
    }
}
