import HttpClient, {APIMapping} from '../http';

export default class ViewDefinitionService {

    static client = new HttpClient(APIMapping.viewDefinitionService);

    static getDefinitionsForSchema(schemaId) {
        return ViewDefinitionService.client.makeRequest('/views', 'GET', undefined, {
    queryParams: {
        schemaId
    }
});
    }

    static getDefinition(viewDefinitionId) {
        return ViewDefinitionService.client.makeRequest(`/views/${viewDefinitionId}`, 'GET');
    }

    static updateDefinition(viewDefinitionId, viewDefinition) {
        return ViewDefinitionService.client.makeRequest(`/views/${viewDefinitionId}`, 'PUT', viewDefinition);
    }

    static createDefinition(viewDefinition) {
        return ViewDefinitionService.client.makeRequest('/views', 'POST', viewDefinition);
    }

    static deleteDefinition(viewDefinitionId) {
        return ViewDefinitionService.client.makeRequest(`/views/${viewDefinitionId}`, 'DELETE');
    }

    static updateCategory(viewId, categoryName, categoryDefinition) {
        return ViewDefinitionService.client.makeRequest(`/views/${viewId}/categories/${categoryName}`, 'PATCH', categoryDefinition);
    }

    static addCategory(viewId, categoryDefinition) {
        return ViewDefinitionService.client.makeRequest(`/views/${viewId}/categories`, 'PATCH', categoryDefinition);
    }

    static deleteCategory(viewId, categoryName) {
        return ViewDefinitionService.client.makeRequest(`/views/${viewId}/categories/${categoryName}`, 'DELETE');
    }
}
