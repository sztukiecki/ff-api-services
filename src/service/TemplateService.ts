import {APIClient, APIMapping} from '../http';
import { AxiosResponse } from 'axios';

export class TemplateService extends APIClient {

    constructor() {
        super(APIMapping.templateService);
    }

    getAllTemplates() {
        return this.invokeApi('/templates', 'GET').then(s => s.data).then(s => s ? s : []);
    }

    getTemplatesByType(type: string) {
        return this.invokeApi(`/templates?templateType=${type}`, 'GET').then(s => s.data).then(s => s ? s : []);
    }

    createTemplate(body: any) {
        return this.invokeApi('/templates', 'POST', body).then(s => s.data);
    }

    uploadContent(id: string, file: any): Promise<AxiosResponse> {
        const formData = new FormData();
        formData.append('file', file, file.name);

        return this.invokeApi(`/templates/${id}/content`, 'POST', formData);
    }

    uploadAttachment(templateId: string, file: any) {
        const formData = new FormData();
        formData.append('file', file, file.name);

        return this.invokeApi(`/templates/${templateId}/attachments`, 'POST', formData);
    }

    removeAttachment(templateId: string, attachmentId: string) {
        return this.invokeApi(`/templates/${templateId}/attachments/delete`, 'POST', attachmentId);
    }

    getTemplateById(id: string) {
        return this.invokeApi(`/templates/${id}`, 'GET').then(s => s.data);
    }

    delete(id: string) {
        return this.invokeApi(`/templates/${id}`, 'DELETE').then(s => s.data);
    }

    updateTemplate(body: any, id: string) {
        return this.invokeApi(`/templates/${id}`, 'PUT', body).then(s => s.data);
    }
}

export default new TemplateService();
