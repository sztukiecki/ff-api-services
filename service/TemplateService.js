import HttpClient, {APIMapping} from 'http';

export default class TemplateService {

    constructor() {
        this.client = new HttpClient(APIMapping.templateService);
    }

    getAllTemplates() {
        return this.client.makeRequetSimple({}, '/templates', 'GET').then(s => s.data).then(s => s ? s : []);
    }

    createTemplate(body) {
        return this.client.makeRequetSimple(body, '/templates', 'POST').then(s => s.data);
    }

    getTemplateById(id) {
        return this.client.makeRequetSimple({}, `/templates/${id}`, 'GET').then(s => s.data);
    }

    delete(id) {
        return this.client.makeRequetSimple({}, `/templates/${id}`, 'DELETE').then(s => s.data);
    }

    updateTemplate(body, id) {
        return this.client.makeRequetSimple(body, `/templates/${id}`, 'PUT').then(s => s.data);
    }
}
