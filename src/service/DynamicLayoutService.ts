import { APIClient, APIMapping } from '../http';
import { AxiosResponse } from 'axios';

export class DynamicLayoutService extends APIClient {

    constructor() {
        super(APIMapping.dynamicLayoutService);
    }

    /**
     * This method fetches a layout for a specific schema. If the provided schema has no overview, then
     * it returns the overview of the group (just if the schema is part of a group)
     * @param schemaId
     */
    async fetchOverviewForSchema(schemaId: string): Promise<AxiosResponse> {
        return this.invokeApi(`/overviews/schemaId/${schemaId}`, 'GET');
    }
}

export default new DynamicLayoutService();
