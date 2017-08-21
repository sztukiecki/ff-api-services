import HttpClient, {APIMapping} from '../http';

export default class FlowfactExportInternalService {

    static client = new HttpClient(APIMapping.flowfactExporterInternalService);

    static createAdminUser(createAdminTokenRequest){
        console.log('Test');
        console.log(createAdminTokenRequest);
        return FlowfactExportInternalService.client.makeRequest('/adminUser', 'POST', createAdminTokenRequest);
    }

}
