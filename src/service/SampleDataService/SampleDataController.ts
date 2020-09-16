import { APIClient, APIMapping } from '../../http';
import { SampleDataServiceTypes } from './SampleDataService.Types';
import ImportBundle = SampleDataServiceTypes.ImportBundle;
import BatchImportResult = SampleDataServiceTypes.BatchImportResult;

export class SampleDataController extends APIClient {
    constructor() {
        super(APIMapping.sampleDataService);
    }

    /**
     * Assigns a bundle to company, by name. If name not provided, assigns bundle "All"
     * @param bundleName
     */
    async importSampleData(bundleName: string = 'All') {
        const queryParams: any = {
            bundleName: bundleName,
        };

        return await this.invokeApiWithErrorHandling('/import', 'POST', undefined, { queryParams });
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

    /**
     * Batch bundle assignment.
     * @param bundles
     */
    async importSampleDataBatch(bundles: ImportBundle[]) {
        return await this.invokeApiWithErrorHandling<BatchImportResult>('/batchimport', 'POST', {
            bundles: bundles,
        });
    }
}
