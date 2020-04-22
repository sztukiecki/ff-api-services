import { APIClient, APIMapping } from '../../http';
import { BaseCategory } from './DocumentTemplateService.Types';

export class CategoriesController extends APIClient {

    constructor() {
        super(APIMapping.documentTemplateService);
    }

    async fetchAllCategories() {
        return this.invokeApiWithErrorHandling<{ entries: BaseCategory[] }>('/categories', 'GET');
    }

    async createCategory(data: BaseCategory) {
        return this.invokeApiWithErrorHandling<BaseCategory>('/templates', 'POST', data);
    }

    async updateCategory(name: string, data: BaseCategory) {
        return this.invokeApiWithErrorHandling<BaseCategory>(`/templates/${name}`, 'PUT', data);
    }

    async deleteCategory(name: string) {
        return this.invokeApiWithErrorHandling(`/templates/${name}`, 'DELETE');
    }
}
