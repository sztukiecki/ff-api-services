import { APIClient, APIMapping } from '../http';
import { AxiosResponse } from 'axios';

export class TemplateService extends APIClient {

    constructor() {
        super(APIMapping.templateService);
    }

    /**
     * TODO: Please comment this method
     */
    fetchAllTemplates() {
        return this.invokeApi('/templates', 'GET').then(s => s.data).then(s => s ? s : []);
    }

    /**
     * TODO: Please comment this method
     * @param type
     */
    fetchTemplatesByType(type: string) {
        return this.invokeApi(`/templates?templateType=${type}`, 'GET').then(s => s.data).then(s => s ? s : []);
    }

    fetchFullTemplatesByType(type: string) {
        return this.invokeApi(`/templates?full=true&templateType=${type}`, 'GET').then(s => s.data).then(s => s ? s : []);
    }

    /**
     * TODO: Please comment this method
     * @param body
     */
    createTemplate(body: any) {
        return this.invokeApi('/templates', 'POST', body).then(s => s.data);
    }

    /**
     * TODO: Please comment this method
     * @param id
     * @param file
     */
    uploadContent(id: string, file: any): Promise<AxiosResponse> {
        const formData = new FormData();
        formData.append('file', file, file.name);

        return this.invokeApi(`/templates/${id}/content`, 'POST', formData);
    }

    /**
     * TODO: Please comment this method
     * @param templateId
     * @param file
     */
    uploadAttachment(templateId: string, file: any) {
        const formData = new FormData();
        formData.append('file', file, file.name);

        return this.invokeApi(`/templates/${templateId}/attachments`, 'POST', formData);
    }

    /**
     * TODO: Please comment this method
     * @param templateId
     * @param attachmentId
     */
    removeAttachment(templateId: string, attachmentId: string) {
        return this.invokeApi(`/templates/${templateId}/attachments/delete`, 'POST', attachmentId);
    }

    /**
     * TODO: Please comment this method
     * @param id
     */
    fetchTemplateById(id: string) {
        return this.invokeApi(`/templates/${id}`, 'GET').then(s => s.data);
    }

    /**
     * TODO: Please comment this method
     * @param id
     */
    delete(id: string) {
        return this.invokeApi(`/templates/${id}`, 'DELETE').then(s => s.data);
    }

    /**
     * TODO: Please comment this method
     * @param body
     * @param id
     */
    updateTemplate(body: any, id: string) {
        return this.invokeApi(`/templates/${id}`, 'PUT', body).then(s => s.data);
    }
}

export default new TemplateService();
