import { APIClient, APIMapping } from '../http';
import { AxiosResponse } from 'axios';

export class FlowfactExportInternalService extends APIClient {

    constructor() {
        super(APIMapping.flowfactExporterInternalService);
    }

    createAdminUser(createAdminTokenRequest: any): Promise<AxiosResponse> {
        return this.invokeApi('/adminUser', 'POST', createAdminTokenRequest);
    }
}

export default new FlowfactExportInternalService();
