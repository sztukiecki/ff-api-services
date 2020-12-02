import { BundleController } from './BundleController';
import { SampleDataController } from './SampleDataController';
import { BatchImportController } from './BatchImportController';

export * from './SampleDataService.Types';

export class SampleDataService {
    public readonly batchImport: BatchImportController;
    public readonly bundle: BundleController;
    public readonly sampledata: SampleDataController;

    constructor() {
        this.batchImport = new BatchImportController();
        this.bundle = new BundleController();
        this.sampledata = new SampleDataController();
    }
}

export const SampleDataServiceInstance = new SampleDataService();
