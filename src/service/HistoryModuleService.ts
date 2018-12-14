import APIClient from "../http/APIClient";
import APIMapping from "../http/APIMapping";
import {AxiosResponse} from "axios";

export class HistoryModuleService extends APIClient {

    constructor() {
        super(APIMapping.historyModuleService);
    }

    async fetchHistory(schemaId: string, entityId: string, size: number = 20, offset: number = 0): Promise<AxiosResponse> {
        return await this.invokeApi('/', 'POST', [{
            schemaId: schemaId,
            entityId: entityId,
            size: size,
            offset: offset
        }]);
    }
}

export default new HistoryModuleService();