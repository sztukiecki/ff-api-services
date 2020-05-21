import { APIClient, APIMapping } from '../../http';
import { BaseCategory, ReadCategory } from './DocumentTemplateService.Types';

export class CategoriesController extends APIClient {

    constructor() {
        super(APIMapping.documentTemplateService);
    }

    async fetchAllCategories() {
        return this.invokeApiWithErrorHandling<{ entries: ReadCategory[] }>('/categories', 'GET');
    }

    async createCategory(data: BaseCategory) {
        return this.invokeApiWithErrorHandling<BaseCategory>('/categories', 'POST', data);
    }

    async updateCategory(name: string, data: BaseCategory) {
        return this.invokeApiWithErrorHandling<BaseCategory>(`/categories/${name}`, 'PUT', data);
    }

    async deleteCategory(name: string) {
        return this.invokeApiWithErrorHandling(`/categories/${name}`, 'DELETE');
    }
}
