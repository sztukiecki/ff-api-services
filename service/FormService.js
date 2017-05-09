import HttpClient, {APIMapping} from 'http';

export default class FormService {

    constructor() {
        this.client = new HttpClient(APIMapping.formService);
    }

    render(integrationId) {
        return this.client.makeRequetSimple({}, `/render/${integrationId}`, 'POST').then(s => s.data);
    }
}
