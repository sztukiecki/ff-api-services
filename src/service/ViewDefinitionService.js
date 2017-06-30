import HttpClient, {APIMapping} from '../http';

export default class ViewDefinitionService {

    static client = new HttpClient(APIMapping.viewDefinitionService);

    static getDefinitionsForSchema(schemaId) {
        return this.client.makeRequest({}, '/views', 'GET', undefined, {
            queryParams: {
                schemaId
            }
        });
    }

    static getDefinition(viewDefinitionId) {
        return this.client.makeRequest({}, `/views/${viewDefinitionId}`, 'GET');
    }

    static updateDefinition(viewDefinitionId, viewDefinition) {
        return this.client.makeRequest({}, `/views/${viewDefinitionId}`, 'PUT', viewDefinition);
    }

    static createDefinition(viewDefinition) {
        return this.client.makeRequest({}, '/views', 'POST', viewDefinition);
    }

    static deleteDefinition(viewDefinitionId) {
        return this.client.makeRequest({}, `/views/${viewDefinitionId}`, 'DELETE');
    }

    static updateCategory(viewId, categoryName, categoryDefinition) {
        return this.client.makeRequest({}, `/views/${viewId}/categories/${categoryName}`, 'PATCH', categoryDefinition);
    }

    static addCategory(viewId, categoryDefinition) {
        return this.client.makeRequest({}, `/views/${viewId}/categories`, 'PATCH', categoryDefinition);
    }

    static deleteCategory(viewId, categoryName) {
        return this.client.makeRequest({}, `/views/${viewId}/categories/${categoryName}`, 'DELETE');
    }
}
