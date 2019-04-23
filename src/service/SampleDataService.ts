import { ImportBundle } from '@flowfact/types';
import { AxiosResponse } from 'axios';
import { APIClient, APIMapping } from '../http';

export class SampleDataService extends APIClient {
    constructor() {
        super(APIMapping.sampleDataService);
    }

    /**
     * TODO: Please comment this method
     * @param bundleName
     */
    async importSampleData(bundleName: string = 'All'): Promise<AxiosResponse> {
        const queryParams: any = {
            bundleName: bundleName
        };

        return await this.invokeApi('/import', 'POST', undefined, { queryParams });
    }

    /**
     * TODO: Please comment this method
     * @param bundleName
     */
    async removeSampleData(bundleName: string = 'All'): Promise<AxiosResponse> {
        const queryParams: any = {
            bundleName: bundleName
        };

        return await this.invokeApi('/remove', 'DELETE', undefined, { queryParams });
    }

    /**
     * TODO: Please comment this method
     * @param bundles
     */
    async importSampleDataBatch(bundles: ImportBundle[]): Promise<AxiosResponse> {
        return await this.invokeApi('/batchimport', 'POST', {
            bundles: bundles
        });
    }

    /**
     * TODO: Please comment this method
     * @param scope
     */
    async fetchBundles(scope: 'FLOWFACT' | 'CUSTOM' = 'FLOWFACT'): Promise<AxiosResponse> {
        return await this.invokeApi('/bundles', 'GET', undefined, {
            queryParams: {
                scope: scope
            }
        });
    }
}

export default new SampleDataService();
