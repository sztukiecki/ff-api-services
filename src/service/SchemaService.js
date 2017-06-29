import HttpClient, {APIMapping} from '../http';

export default class SchemaService {
    static client = new HttpClient(APIMapping.schemaService);

    static loadStats() {
        return SchemaService.client.makeRequest({}, '/stats', 'GET');
    }

    static getAllSchemas() {
        return SchemaService.client.makeRequest({}, '/schemas?transform', 'GET');
    }

    static getDataBySchemaId(schemaId, page = 1, size = null) {
        return SchemaService.client.makeRequest({}, `/data/${schemaId}`, 'GET', undefined, {
            queryParams: {
                page: page,
                size: size
            }
        });
    }

    static selectSchemaById(schemaId) {
        return SchemaService.client.makeRequest({}, `/schemas/${schemaId}?transform`, 'GET');
    }

    static createNewSchema(schema) {
        return SchemaService.client.makeRequest({}, '/schemas?transform', 'POST', schema);
    }

    static deleteSchema(schemaId) {
        return SchemaService.client.makeRequest({}, `/schemas/${schemaId}`, 'DELETE');
    }

    static updateSchema(schema) {
        return SchemaService.client.makeRequest({}, `/schemas/${schema.id}?transform`, 'PUT', schema);
    }

    static integrationsForSchemaId(schemaId) {
        return SchemaService.client.makeRequest({}, `/integrations?schemaId=${schemaId}&transform`, 'GET');
    }

    static createNewIntegrationForSchema(schemaId, label) {
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

    static deleteEntity(entityId, schemaId) {
        return SchemaService.client.makeRequest({}, '/data', 'DELETE', undefined, {
            queryParams: {
                schemaId,
                entityId
            }
        });
    }

    static updateEntity(schemaId, entityId, entity) {
        return SchemaService.client.makeRequest({}, `/data/${schemaId}/entity/${entityId}`, 'PUT', entity);
    }
}