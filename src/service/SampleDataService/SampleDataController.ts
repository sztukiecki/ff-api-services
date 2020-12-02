import { APIClient, APIMapping } from '../../http';

export class SampleDataController extends APIClient {
    constructor() {
        super(APIMapping.sampleDataService);
    }

    /**
     * Removes sample data from company.
     * @param bundleName
     */
    async removeSampleData(bundleName: string = 'All') {
        const queryParams: any = {
            bundleName: bundleName,
        };

        return await this.invokeApiWithErrorHandling('/remove', 'DELETE', undefined, { queryParams });
    }
}
