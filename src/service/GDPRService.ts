import APIClient from "../http/APIClient";
import APIMapping from "../http/APIMapping";
import {AxiosResponse} from "axios";
import { EntityQuery } from '../util/InternalTypes';

export type ExportType = 'JSON' | 'CSV' | 'XML';

export interface ExportRequestBody {
    contactId: string;
    exportType: ExportType;
    recipientEmail: string;
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
}

export default new GDPRService();
