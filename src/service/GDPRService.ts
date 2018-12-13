import APIClient from "../http/APIClient";
import APIMapping from "../http/APIMapping";
import {AxiosResponse} from "axios";
import {EntityQuery} from '../util/InternalTypes';

export type ExportType = 'JSON' | 'CSV' | 'XML';

export interface ExportRequestBody {
    contactId: string;
    exportType: ExportType;
    recipientEmail: string;
}

export interface Settings {
    companyId: string;
    contactApproachAlwaysAllowed: boolean;
}

export type DataChangeRequestType = 'DELETE' | 'CHANGE' | 'PROCESS_LIMITATION';

export class GDPRService extends APIClient {

    constructor() {
        super(APIMapping.gdprService);
    }

    async fetchContact(contactId: string, userId: string, companyId: string): Promise<AxiosResponse> {
        return await this.invokeApi('/public/contact', 'GET', undefined, {
            queryParams: {
                contactId: contactId,
                userId: userId,
                companyId: companyId
            }
        });
    }

    async fetchCompanyTerms(userId: string, companyId: string): Promise<AxiosResponse> {
        return await this.invokeApi('/public/company', 'GET', undefined, {
            queryParams: {
                userId: userId,
                companyId: companyId
            }
        });
    }

    async fetchConsents(contactId: string, userId: string, companyId: string): Promise<AxiosResponse> {
        return await this.invokeApi('/public/consents', 'GET', undefined, {
            queryParams: {
                contactId: contactId,
                userId: userId,
                companyId: companyId
            }
        });
    }

    async exportPersonalData(userId: string, companyId: string, body: ExportRequestBody): Promise<AxiosResponse> {
        return await this.invokeApi('/public/export', 'POST', body, {
            queryParams: {
                userId: userId,
                companyId: companyId
            }
        });
    }

    async resolveEntities(companyId: string, userId: string, body: EntityQuery[]): Promise<AxiosResponse> {
        return await this.invokeApi('/public/resolveEntities', 'POST', body, {
            queryParams: {
                userId: userId,
                companyId: companyId
            }
        });
    }

    async changeData(contactId: string, userId: string, companyId: string, type: DataChangeRequestType = 'CHANGE', changes: object = {}): Promise<AxiosResponse> {
        return await this.invokeApi('/public/changeRequests', 'POST', {
            contactId: contactId,
            type: type,
            changes: changes
        }, {
            queryParams: {
                userId: userId,
                companyId: companyId
            }
        });
    }

    async fetchChangeRequestStatus(contactId: string, userId: string, companyId: string): Promise<AxiosResponse> {
        return await this.invokeApi('/public/changeRequests/status', 'GET', undefined, {
            queryParams: {
                contactId: contactId,
                userId: userId,
                companyId: companyId
            }
        });
    }

    async updateChangeRequestStatus(changeRequestId: string, status: 'APPROVED' | 'DENIED', reason: string): Promise<AxiosResponse> {
        const formData = new FormData();
        formData.append('reason', reason);

        return await this.invokeApi(`/changeRequests/${changeRequestId}/status/${status}`, 'POST', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    async revokeConsent(consentId: string, consentSchemaId: string, userId: string, companyId: string): Promise<AxiosResponse> {
        return await this.invokeApi(`/public/consents/schemaId/${consentSchemaId}/entityId/${consentId}/revoke`, 'POST', undefined, {
            queryParams: {
                userId: userId,
                companyId: companyId
            }
        });
    }

    async createConsent(consentEntity: object, userId: string, companyId: string): Promise<AxiosResponse> {
        return await this.invokeApi('/public/consents', 'POST', consentEntity, {
            queryParams: {
                userId: userId,
                companyId: companyId
            }
        });
    }

    async fetchSettings(): Promise<AxiosResponse<Settings>> {
        return await this.invokeApi('/settings', 'GET');
    }

    async updateSettings(settings: Settings): Promise<AxiosResponse> {
        return await this.invokeApi('/settings', 'PUT', settings);
    }

    async fetchAllChangeRequests(): Promise<AxiosResponse> {
        return await this.invokeApi('/changeRequests/all', 'GET');
    }

    async isContactBlocked(contactId: string): Promise<AxiosResponse> {
        return await this.invokeApi('/contact/blocked', 'GET', undefined, {
            queryParams: {
                contactId: contactId
            }
        });
    }

    async blockContact(contactId: string, block: boolean): Promise<AxiosResponse> {
        return await this.invokeApi('/contact/block', 'POST', undefined, {
            headers: {
                'Content-Type': 'application/json'
            },
            queryParams: {
                block: block,
                contactId: contactId
            }
        });
    }

    async sendConsentMail(contactId: string) {
        return await this.invokeApi(`/consents/mail/${contactId}`, 'POST');
    }
}

export default new GDPRService();
