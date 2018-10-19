import APIClient from "../http/APIClient";
import APIMapping from "../http/APIMapping";
import {AxiosResponse} from "axios";

export type ExportType = 'JSON' | 'CSV' | 'XML';

export interface ExportRequestBody {
    contactId: string;
    exportType: ExportType;
    recipientEmail: string;
}

export interface EntityQuery {
    entityId: string;
    schemaId: string;
}

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
}

export default new GDPRService();