import HttpClient, {APIMapping} from '../http';

export default class TemplateService {

    constructor() {
        this.client = new HttpClient(APIMapping.templateService);
    }

    getAllTemplates() {
        return this.client.makeRequetSimple({}, '/templates', 'GET').then(s => s.data).then(s => s ? s : []);
    }

    getTemplatesByType(type) {
        return this.client.makeRequetSimple({}, `/templates?templateType=${type}`, 'GET').then(s => s.data).then(s => s ? s : []);
    }

    createTemplate(body) {
        return this.client.makeRequetSimple(body, '/templates', 'POST').then(s => s.data);
    }

    uploadContent(id, file) {
        const formData = new FormData();
        formData.append('file', file, file.name);

        return this.client.makeRequest({}, `/templates/${id}/content`, 'POST', formData)
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
