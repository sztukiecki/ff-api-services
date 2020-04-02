import { APIClient, APIMapping } from '../../http';
import { ReadCategory, WriteCategory } from './DocumentTemplateService.Types';

export class CategoriesController extends APIClient {

    constructor() {
        super(APIMapping.documentTemplateService);
    }

    async fetchAllCategories() {
        return this.invokeApiWithErrorHandling<{ entries: ReadCategory[] }>('/categories', 'GET');
    }

    async createCategory(data: WriteCategory) {
        return this.invokeApiWithErrorHandling<ReadCategory>('/templates', 'POST', data);
    }

    async updateCategory(name: string, data: WriteCategory) {
        return this.invokeApiWithErrorHandling<ReadCategory>(`/templates/${name}`, 'PUT', data);
    }

    async deleteCategory(name: string) {
        return this.invokeApiWithErrorHandling(`/templates/${name}`, 'DELETE');
    }
}
