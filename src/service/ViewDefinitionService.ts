import HttpClient, {APIMapping} from '../http';

export interface ShortViewDefinition {
    id: string;
    name: string;
    schemaId: string;
}

export interface ViewDefinitionCategory {
    name: string;
    fields: string[];
}

export interface ViewDefinition extends ShortViewDefinition {
    componentId: string;
    categories: ViewDefinitionCategory[];
}

export default class ViewDefinitionService {

    static client = new HttpClient(APIMapping.viewDefinitionService);

    static getDefinitionsForSchema(schemaId: string): Promise<ShortViewDefinition[]> {
        return ViewDefinitionService.client.makeRequest('/views', 'GET', undefined, {
            queryParams: {
                schemaId
            }
        }).then(({data}) => data || []);
    }

    static getDefinition(viewDefinitionId: string): Promise<ViewDefinition> {
        return ViewDefinitionService.client.makeRequest(`/views/${viewDefinitionId}`, 'GET').then(({data}) => data);
    }

    static updateDefinition(viewDefinitionId: string, viewDefinition: ViewDefinition) {
        return ViewDefinitionService.client.makeRequest(`/views/${viewDefinitionId}`, 'PUT', viewDefinition);
    }

    static createDefinition(viewDefinition: ViewDefinition) {
        return ViewDefinitionService.client.makeRequest('/views', 'POST', viewDefinition);
    }

    static deleteDefinition(viewDefinitionId: string) {
        return ViewDefinitionService.client.makeRequest(`/views/${viewDefinitionId}`, 'DELETE');
    }

    static updateCategory(viewId: string, categoryName: string, categoryDefinition: ViewDefinitionCategory) {
        return ViewDefinitionService.client.makeRequest(`/views/${viewId}/categories/${categoryName}`, 'PATCH', categoryDefinition);
    }

    static addCategory(viewId: string, categoryDefinition: ViewDefinitionCategory) {
        return ViewDefinitionService.client.makeRequest(`/views/${viewId}/categories`, 'PATCH', categoryDefinition);
    }

    static deleteCategory(viewId: string, categoryName: string) {
        return ViewDefinitionService.client.makeRequest(`/views/${viewId}/categories/${categoryName}`, 'DELETE');
    }
}
