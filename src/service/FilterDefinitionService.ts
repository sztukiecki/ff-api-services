import { APIClient, APIMapping } from '../http';

class FilterDefinitionService extends APIClient {

    constructor() {
        super(APIMapping.filterDefinitionService);
    }

    /**
     * Fetchs filter for a specific schema
     * @param schemaName
     */
    fetchFilter = async (schemaName: string) => {
        return await this.invokeApi('/filters', 'GET', undefined, {
            queryParams: {
                schemaName: schemaName
            }
        });
    }
}

export default new FilterDefinitionService();