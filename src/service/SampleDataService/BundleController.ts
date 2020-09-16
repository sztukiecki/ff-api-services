import { APIClient, APIMapping } from '../../http';
import { SampleDataServiceTypes } from './SampleDataService.Types';
import Bundles = SampleDataServiceTypes.Bundles;
import Bundle = SampleDataServiceTypes.Bundle;

export class BundleController extends APIClient {
    constructor() {
        super(APIMapping.sampleDataService);
    }

    /**
     * Fetches all bundles by scope and further params.
     * @param scope of FLOWFACT or CUSTOM
     * @param onlySelectableByCustomer as null, true or false. When not set, returns all.
     */
    async fetchBundles(scope: 'FLOWFACT' | 'CUSTOM' = 'FLOWFACT', onlySelectableByCustomer: boolean = true) {
        return await this.invokeApiWithErrorHandling<Bundles>('/bundles', 'GET', undefined, {
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
    async fetchBundle(scope: 'FLOWFACT' | 'CUSTOM' = 'FLOWFACT', bundleName: string) {
        return await this.invokeApiWithErrorHandling<Bundle>(`/bundles/${bundleName}`, 'GET', undefined, {
            queryParams: {
                scope: scope,
            },
        });
    }
}
