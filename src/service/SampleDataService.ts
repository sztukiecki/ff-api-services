import { APIClient, APIMapping } from '../http';
import { AxiosResponse } from 'axios';

export class SampleDataService extends APIClient {
    constructor() {
        super(APIMapping.sampleDataService);
    }

    importSampleData(bundleName: string = 'Basic'): Promise<AxiosResponse> {
        const queryParams: any = {
            bundleName: bundleName
        };

        return this.invokeApi('/import', 'GET', undefined, {queryParams});
    }
}

export default new SampleDataService();