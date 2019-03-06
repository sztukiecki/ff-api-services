import { APIClient, APIMapping } from '../http';
import { AxiosResponse } from 'axios';

export class SampleDataService extends APIClient {
    constructor() {
        super(APIMapping.sampleDataService);
    }

    importSampleData(bundleName: string = 'All'): Promise<AxiosResponse> {
        const queryParams: any = {
            bundleName: bundleName
        };

        return this.invokeApi('/import', 'POST', undefined, {queryParams});
    }

    fetchBundles(scope: 'FLOWFACT' | 'CUSTOM' = 'FLOWFACT') {
        return this.invokeApi('/bundles', 'GET', undefined, {
            queryParams: {
                scope: scope
            }
        });
    }
}

export default new SampleDataService();
