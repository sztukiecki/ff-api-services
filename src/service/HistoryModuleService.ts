import APIClient from '../http/APIClient';
import APIMapping from '../http/APIMapping';
import { AxiosResponse } from 'axios';

export interface Filter {
    includedTypes?: string[],
    excludedTypes?: string[]
}

export class HistoryModuleService extends APIClient {

    constructor() {
        super(APIMapping.historyModuleService);
    }

    async fetchHistory(schemaId: string, entityId: string, size: number = 20, offset: number = 0, filter?: Filter): Promise<AxiosResponse> {
        let body: any = {
            schemaId: schemaId,
            entityId: entityId,
            size: size,
            offset: offset
        };

        if(filter) {
            body.filter = filter;
        }

        return await this.invokeApi('/history', 'POST', [body]);
    }
}

export default new HistoryModuleService();