import { DataChangeRequestType, ExportRequestBody, Settings } from '@flowfact/types';
import { AxiosResponse } from 'axios';
import APIClient from '../http/APIClient';
import APIMapping from '../http/APIMapping';
import { EntityQuery } from '../util/InternalTypes';

export class GDPRService extends APIClient {

    constructor() {
        super(APIMapping.gdprService);
    }

    /**
     * TODO: Please comment this method
     * @param token
     */
    async fetchConsentData(token: string): Promise<AxiosResponse> {
        return await this.invokeApi('/public/consents/consentdata', 'GET', undefined, {
            queryParams: {
                token: token,
            },
        });
    }

    /**
     * TODO: Please comment this method
     * @param userId
     * @param companyId
     */
    async fetchCompanyTerms(userId: string, companyId: string): Promise<AxiosResponse> {
        return await this.invokeApi('/public/company', 'GET', undefined, {
            queryParams: {
                userId: userId,
                companyId: companyId,
            },
        });
    }

    /**
     * TODO: Please comment this method
     * @param contactId
     * @param userId
     * @param companyId
     */
    async fetchConsents(contactId: string, userId: string, companyId: string): Promise<AxiosResponse> {
        return await this.invokeApi('/public/consents', 'GET', undefined, {
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
    async exportPersonalData(userId: string, companyId: string, body: ExportRequestBody): Promise<AxiosResponse> {
        return await this.invokeApi('/public/export', 'POST', body, {
            queryParams: {
                userId: userId,
                companyId: companyId,
            },
        });
    }

    /**
     * TODO: Please comment this method
     * @param companyId
     * @param userId
     * @param body
     */
    async resolveEntities(companyId: string, userId: string, body: EntityQuery[]): Promise<AxiosResponse> {
        return await this.invokeApi('/public/resolveEntities', 'POST', body, {
            queryParams: {
                userId: userId,
                companyId: companyId,
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
    async changeData(contactId: string, userId: string, companyId: string, type: DataChangeRequestType = 'CHANGE', changes: object = {}): Promise<AxiosResponse> {
        return await this.invokeApi('/public/changeRequests', 'POST', {
            contactId: contactId,
            type: type,
            changes: changes,
        }, {
            queryParams: {
                userId: userId,
                companyId: companyId,
            },
        });
    }

    /**
     * TODO: Please comment this method
     * @param contactId
     * @param userId
     * @param companyId
     */
    async fetchChangeRequestStatus(contactId: string, userId: string, companyId: string): Promise<AxiosResponse> {
        return await this.invokeApi('/public/changeRequests/status', 'GET', undefined, {
            queryParams: {
                contactId: contactId,
                userId: userId,
                companyId: companyId,
            },
        });
    }

    /**
     * TODO: Please comment this method
     * @param changeRequestId
     * @param status
     * @param reason
     */
    async updateChangeRequestStatus(changeRequestId: string, status: 'APPROVED' | 'DENIED', reason: string): Promise<AxiosResponse> {
        const formData = new FormData();
        formData.append('reason', reason);

        return await this.invokeApi(`/changeRequests/${changeRequestId}/status/${status}`, 'POST', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
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
    async revokeConsent(consentId: string, consentSchemaId: string, userId: string, companyId: string): Promise<AxiosResponse> {
        return await this.invokeApi(`/public/consents/schemaId/${consentSchemaId}/entityId/${consentId}/revoke`, 'POST', undefined, {
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
    async createConsent(consentEntity: object, userId: string, companyId: string): Promise<AxiosResponse> {
        return await this.invokeApi('/public/consents', 'POST', consentEntity, {
            queryParams: {
                userId: userId,
                companyId: companyId,
            },
        });
    }

    /**
     * TODO: Please comment this method
     * @param consentEntity
     */
    async addConsent(consentEntity: object): Promise<AxiosResponse> {
        return await this.invokeApi('/consents', 'POST', consentEntity);
    }

    /**
     * TODO: Please comment this method
     * @param contactIds
     */
    async fetchConsentForContacts(contactIds: object): Promise<AxiosResponse> {
        return await this.invokeApi('/consents/forContacts', 'POST', contactIds);
    }

    /**
     * TODO: Please comment this method
     */
    async fetchSettings(): Promise<AxiosResponse<Settings>> {
        return await this.invokeApi('/settings', 'GET');
    }

    /**
     * TODO: Please comment this method
     * @param settings
     */
    async updateSettings(settings: Settings): Promise<AxiosResponse> {
        return await this.invokeApi('/settings', 'PUT', settings);
    }

    /**
     * TODO: Please comment this method
     */
    async fetchAllChangeRequests(): Promise<AxiosResponse> {
        return await this.invokeApi('/changeRequests/all', 'GET');
    }

    /**
     * TODO: Please comment this method
     * @param page
     * @param size
     */
    async fetchContactsWithPendingConsent(page: number = 1, size: number = 50): Promise<AxiosResponse> {
        return await this.invokeApi('/contacts', 'GET', undefined, {
            queryParams: {
                status: 'CONSENT_PENDING',
                page: page,
                size: size,
            },
        });
    }

    /**
     * TODO: Please comment this method
     * @param contactId
     */
    async isContactBlocked(contactId: string): Promise<AxiosResponse> {
        return await this.invokeApi('/contact/blocked', 'GET', undefined, {
            queryParams: {
                contactId: contactId,
            },
        });
    }

    /**
     * TODO: Please comment this method
     * @param contactId
     */
    async consentStatus(contactId: string): Promise<AxiosResponse> {
        return await this.invokeApi('/consents/status', 'GET', undefined, {
            queryParams: {
                contactId: contactId,
            },
        });
    }

    /**
     * TODO: Please comment this method
     * @param contactId
     * @param block
     */
    async blockContact(contactId: string, block: boolean): Promise<AxiosResponse> {
        return await this.invokeApi('/contact/block', 'POST', undefined, {
            headers: {
                'Content-Type': 'application/json',
            },
            queryParams: {
                block: block,
                contactId: contactId,
            },
        });
    }

    /**
     * TODO: Please comment this method
     * @param contactId
     */
    async sendConsentMail(contactId: string): Promise<AxiosResponse> {
        return await this.invokeApi(`/consents/mail/${contactId}`, 'POST');
    }

    /**
     * TODO: Please comment this method
     * @param contactId
     */
    async sendCheckContactDetailsMail(contactId: string): Promise<AxiosResponse> {
        return await this.invokeApi(`/contacts/mail/${contactId}`, 'POST');
    }

    /**
     * TODO: Please comment this method
     * @param contactId
     * @param companyId
     * @param userId
     */
    async sendNewConsentMail(contactId: string, companyId: string, userId: string): Promise<AxiosResponse> {
        return await this.invokeApi('/public/consents/mail', 'POST', undefined, {
            queryParams: {
                companyId: companyId,
                contactId: contactId,
                userId: userId,
            },
        });
    }

    /**
     * TODO: Please comment this method
     * @param consentId
     */
    async fetchConsentAuthor(consentId: string): Promise<AxiosResponse> {
        return await this.invokeApi(`/consents/${consentId}/author`, 'GET');
    }
}

export default new GDPRService();
