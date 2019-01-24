import { APIClient, APIMapping } from '../http';
import { AxiosResponse } from 'axios';

export class DynamicLayoutService extends APIClient {

    constructor() {
        super(APIMapping.dynamicLayoutService);
    }

    async getOverviewForSchema(schemaId: string): Promise<AxiosResponse> {
        return this.invokeApi(`/overviews/schemaId/${schemaId}`, 'GET');
    }
}

export default new DynamicLayoutService();
