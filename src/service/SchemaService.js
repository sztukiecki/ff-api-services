import HttpClient, {APIMapping} from '../http';

export default class SchemaService {
    static client = new HttpClient(APIMapping.schemaService);

    static loadStats(withGroups = false) {
        const additionalParams = withGroups ? {queryParams: {groups: 'true'}} : undefined;
        return SchemaService.client.makeRequest({}, '/stats', 'GET', undefined, additionalParams);
    }

    static getAllSchemas(withGroups = false) {
        let queryParams = {
            transform: true
        };

        if (withGroups) {
            queryParams.groups = 'true';
        }
        return SchemaService.client.makeRequest({}, '/schemas', 'GET', undefined, {queryParams});
    }

    static getDataBySchemaId(schemaId, page = 1, size = null) {
        return SchemaService.client.makeRequest({}, `/data/${schemaId}`, 'GET', undefined, {
            queryParams: {
                page: page,
                size: size
            }
        });
    }

    static getSchema(schemaId) {
        return SchemaService.client.makeRequest({}, `/schemas/${schemaId}?transform`, 'GET');
    }

    static createSchema(schema) {
        return SchemaService.client.makeRequest({}, '/schemas?transform', 'POST', schema);
    }

    static deleteSchema(schemaId) {
        return SchemaService.client.makeRequest({}, `/schemas/${schemaId}`, 'DELETE');
    }

    static updateSchema(schema) {
        return SchemaService.client.makeRequest({}, `/schemas/${schema.id}?transform`, 'PUT', schema);
    }

    static getIntegrationsForSchema(schemaId) {
        return SchemaService.client.makeRequest({}, `/integrations?schemaId=${schemaId}&transform`, 'GET');
    }

    static createIntegrationForSchema(schemaId, label) {
        const integration = {
            schemaId, label
        };
        return SchemaService.client.makeRequest({}, '/integrations?transform', 'POST', integration);
    }

    static updateIntegration(integrationId, data) {
        return SchemaService.client.makeRequest({}, `/integrations/${integrationId}/formdata?transform`, 'POST', data);
    }

    static deleteIntegration(integrationId) {
        return SchemaService.client.makeRequest({}, `/integrations/${integrationId}`, 'DELETE');
    }

    static getResponseForIntegrationGetUrlByUrl(url) {
        return SchemaService.client.makeRequest({}, url, 'GET');
    }

    static getResponseForIntegrationGetUrlById(integrationId) {
        return SchemaService.client.makeRequest({}, `/integrations/${integrationId}/data`, 'GET');
    }
}