import APIClient from "../http/APIClient";
import APIMapping from "../http/APIMapping";

export class HistoryModuleService extends APIClient {

    constructor() {
        super(APIMapping.historyModuleService);
    }

    async fetchHistory(schemaId: string, entityId: string, size: number = 20, offset: number = 0) {
        return await this.invokeApi('/', 'POST', [{
            schemaId: schemaId,
            entityId: entityId,
            size: size,
            offset: offset
        }]);
    }
}

export default new HistoryModuleService();