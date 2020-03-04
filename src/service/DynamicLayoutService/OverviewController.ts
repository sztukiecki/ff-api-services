import { APIClient, APIMapping } from '../../http';

export default class OverviewController extends APIClient {

    constructor() {
        super(APIMapping.dynamicLayoutService);
    }

    /**
     * This method fetches a layout for a specific schema. If the provided schema has no overview, then
     * it returns the overview of the group (just if the schema is part of a group)
     * @param schemaId
     */
    async fetchOverviewForSchema(schemaId: string) {
        return this.invokeApiWithErrorHandling(`/overviews/schemaId/${schemaId}`, 'GET');
    }
}
