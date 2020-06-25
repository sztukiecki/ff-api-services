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
            bundleName: bundleName,
        };

        return await this.invokeApi('/import', 'POST', undefined, { queryParams });
    }

    /**
     * TODO: Please comment this method
     * @param bundleName
     */
    async removeSampleData(bundleName: string = 'All'): Promise<AxiosResponse> {
        const queryParams: any = {
            bundleName: bundleName,
        };

        return await this.invokeApi('/remove', 'DELETE', undefined, { queryParams });
    }

    /**
     * TODO: Please comment this method
     * @param bundles
     */
    async importSampleDataBatch(bundles: ImportBundle[]): Promise<AxiosResponse> {
        return await this.invokeApi('/batchimport', 'POST', {
            bundles: bundles,
        });
    }

    /**
     * Fetches all bundles by scope and further params.
     * @param scope of FLOWFACT or CUSTOM
     * @param onlySelectableByCustomer as null, true or false. When not set, returns all.
     */
    async fetchBundles(scope: 'FLOWFACT' | 'CUSTOM' = 'FLOWFACT', onlySelectableByCustomer: boolean = true): Promise<AxiosResponse> {
        return await this.invokeApi('/bundles', 'GET', undefined, {
            queryParams: {
                scope: scope,
                onlySelectableByCustomer: onlySelectableByCustomer,
            },
        });
    }

    /**
     * Fetches one bundle by name and further params.
     * @param scope of FLOWFACT or CUSTOM
     * @param bundleName for bundle to fetch
     */
    async fetchBundle(scope: 'FLOWFACT' | 'CUSTOM' = 'FLOWFACT', bundleName: string): Promise<AxiosResponse> {
        return await this.invokeApi(`/bundles/${bundleName}`, 'GET', undefined, {
            queryParams: {
                scope,
            },
        });
    }
}

export default new SampleDataService();
