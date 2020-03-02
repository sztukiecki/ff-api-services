import { HistoryFilter } from '@flowfact/types';
import { AxiosResponse } from 'axios';
import APIClient from '../http/APIClient';
import APIMapping from '../http/APIMapping';

export class HistoryModuleService extends APIClient {

    constructor() {
        super(APIMapping.historyModuleService);
    }

    /**
     * Fetches a history of an entity
     * @param schemaId
     * @param entityId
     * @param size
     * @param offset
     * @param filter
     */
    async fetchHistory(schemaId: string, entityId: string, size: number = 20, offset: number = 0, filter?: HistoryFilter): Promise<AxiosResponse> {
        let body: any = {
            schemaId: schemaId,
            entityId: entityId,
            size: size,
            offset: offset,
        };

        if (filter) {
            body.filter = filter;
        }

        return await this.invokeApi('/history', 'POST', [body]);
    }
}

export default new HistoryModuleService();