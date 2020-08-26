import { AxiosResponse } from 'axios';
import { APIClient, APIMapping } from '../http';

export class ImporterFlowFactTransferService extends APIClient {

    constructor() {
        super(APIMapping.importerFlowFactTransferService);
    }

    async getNewIdFromLegacySystem(tableName: string, dsn: string): Promise<AxiosResponse<string>> {
        return this.invokeApi('/id', 'GET', undefined, {
            queryParams: {
                tableName,
                oldId: dsn
            }
        });
    }

    async getDirectoryEntries(companyId: string): Promise<AxiosResponse<string>> {
        return this.invokeApi(`/log/company/${companyId}`, 'GET')
    }

    async getContentsInDirectoryOfCompany(companyId: string, table: string): Promise<AxiosResponse<string>> {
        return this.invokeApi(`/log/company/${companyId}/table/${table}`, `GET`)
    }
}

export default new ImporterFlowFactTransferService();
