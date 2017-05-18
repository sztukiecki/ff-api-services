import HttpClient, {APIMapping} from '../http';

export default class FormService {

    static client = new HttpClient(APIMapping.formService);

    static render(integrationId) {
        return FormService.client.makeRequetSimple({}, `/render/${integrationId}`, 'POST').then(s => s.data);
    }
}
