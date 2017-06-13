import HttpClient, {APIMapping} from '../http';

export default class ViewDefinitionService {

    static client = new HttpClient(APIMapping.viewDefinitionService);

    static getDefinitionsForSchema(schemaId) {
        return ViewDefinitionService.client.makeRequest({}, '/views', 'GET', undefined, {
            queryParams: {
                schemaId
            }
        });
    }

    static getDefinition(viewDefinitionId) {
        return ViewDefinitionService.client.makeRequest({}, `/views/${viewDefinitionId}`, 'GET');
    }

    static updateDefinition(viewDefinitionId, viewDefinition) {
        return ViewDefinitionService.client.makeRequest({}, `/views/${viewDefinitionId}`, 'PUT', viewDefinition);
    }

    static createDefinition(viewDefinition) {
        return ViewDefinitionService.client.makeRequest({}, '/views', 'POST', viewDefinition);
    }

    static deleteDefinition(viewDefinitionId) {
        return ViewDefinitionService.client.makeRequest({}, `/views/${viewDefinitionId}`, 'DELETE');
    }
}