import { APIClient, APIMapping } from '../http';
import { AxiosResponse } from 'axios';

interface ImportBundle {
    bundleName: string;
    scope: string;
    withEntities: boolean;
}

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

    importSampleDataBatch(bundles: ImportBundle[]): Promise<AxiosResponse> {
        return this.invokeApi('/batchimport', 'POST', bundles);
    }

    fetchBundles(scope: 'FLOWFACT' | 'CUSTOM' = 'FLOWFACT'): Promise<AxiosResponse> {
        return this.invokeApi('/bundles', 'GET', undefined, {
            queryParams: {
                scope: scope
            }
        });
    }
}

export default new SampleDataService();
