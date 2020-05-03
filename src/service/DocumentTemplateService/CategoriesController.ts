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
        return this.invokeApiWithErrorHandling<BaseCategory>('/templates', 'POST', data, {
            headers: {
                // We have to set the content type manually here, because otherwise the Content-Type application/problem+json will be set. I don't know why :x
                'Content-Type': 'application/json'
            }
        });
    }

    async updateCategory(name: string, data: BaseCategory) {
        return this.invokeApiWithErrorHandling<BaseCategory>(`/templates/${name}`, 'PUT', data);
    }

    async deleteCategory(name: string) {
        return this.invokeApiWithErrorHandling(`/templates/${name}`, 'DELETE');
    }
}
