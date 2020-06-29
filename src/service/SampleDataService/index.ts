import {BundleController} from './BundleController';
import {SampleDataController} from './SampleDataController';

export * from './SampleDataService.Types';

export class SampleDataService {

    public readonly bundle: BundleController;
    public readonly sampledata: SampleDataController;

    constructor() {
        this.bundle = new BundleController();
        this.sampledata = new SampleDataController();
    }
}

export const SampleDataServiceInstance = new SampleDataService();
