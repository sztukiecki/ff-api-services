import { APIClient, APIMapping } from '../../http';
import { ReadTemplate, WriteTemplate } from './DocumentTemplateService.Types';

export class TemplateController extends APIClient {

    constructor() {
        super(APIMapping.documentTemplateService);
    }

    /**
     * Fetches all available templates
     */
    async fetchAllTemplates() {
        return this.invokeApiWithErrorHandling<{ entries: ReadTemplate[] }>('/templates', 'GET');
    }

    /**
     * Creates a new template and uploads the given file.
     * @param file
     * @param data
     */
    async createTemplate(file: File, data: WriteTemplate) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('data', JSON.stringify(data));

        return this.invokeApiWithErrorHandling<ReadTemplate>('/templates', 'POST', formData, {
            headers: {
                'Content-Type': 'multipart/*'
            }
        });
    }

    /**
     *
     * @param file
     * @param data
     */
    async updateTemplate(file: File, data: WriteTemplate) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('data', JSON.stringify(data));

        return this.invokeApiWithErrorHandling<ReadTemplate>(`/templates/${data.name}`, 'PUT', formData,  {
            headers: {
                'Content-Type': 'multipart/*'
            }
        });
    }

    /**
     * Deletes an existing template by the name.
     * @param name
     */
    async deleteTemplate(name: string) {
        return this.invokeApiWithErrorHandling(`/templates/${name}`, 'DELETE');
    }
}
