import APIClient from "../http/APIClient";
import APIMapping from "../http/APIMapping";
import {AxiosResponse} from "axios";

export class HistoryModuleService extends APIClient {

    constructor() {
        super(APIMapping.historyModuleService);
    }

    async fetchHistory(schemaId: string, entityId: string, filterType: any = null, size: number = 20, offset: number = 0): Promise<AxiosResponse> {
        let body: any = {
            schemaId: schemaId,
            entityId: entityId,
            size: size,
            offset: offset
        };

        if(filterType) {
            body.filter = {
                type: filterType
            }
        }

        return await this.invokeApi('/history', 'POST', [body]);
    }
}

export default new HistoryModuleService();