import { User } from '@flowfact/types';
import { AxiosResponse } from 'axios';
import { APIClient, APIMapping } from '../http';

export class ImporterFlowFactTransferService extends APIClient {

    constructor() {
        super(APIMapping.importerFlowFactTransferService);
    }

    async getNewIdFromLegacySystem(tableName: string, dsn: string): Promise<AxiosResponse<User>> {
        return this.invokeApi('/id', 'GET', undefined, {
            queryParams: {
                tableName,
                oldId: dsn
            }
        });
    }

}

export default new ImporterFlowFactTransferService();
