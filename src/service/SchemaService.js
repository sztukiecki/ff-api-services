import HttpClient, {APIMapping} from '../http';

export default class SchemaService {
    static client = new HttpClient(APIMapping.schemaService);

    static loadStats() {
        return this.client.makeRequest({}, '/stats', 'GET');
    }

    static getAllSchemas(withGroups = false) {
        let queryParams = {
            transform: true
        };

        if (withGroups) {
            queryParams.groups = 'true';
        }
        return this.client.makeRequest({}, '/schemas', 'GET', undefined, {queryParams});
    }

    static getDataBySchemaId(schemaId, page = 1, size = null) {
        return this.client.makeRequest({}, `/data/${schemaId}`, 'GET', undefined, {
            queryParams: {
                page: page,
                size: size
            }
        });
    }

    static getSchema(schemaId) {
        return this.client.makeRequest({}, `/schemas/${schemaId}?transform`, 'GET');
    }

    static createSchema(schema) {
        return this.client.makeRequest({}, '/schemas?transform', 'POST', schema);
    }

    static deleteSchema(schemaId) {
        return this.client.makeRequest({}, `/schemas/${schemaId}`, 'DELETE');
    }

    static updateSchema(schema) {
        return this.client.makeRequest({}, `/schemas/${schema.id}?transform`, 'PUT', schema);
    }

    static getIntegrationsForSchema(schemaId) {
        return this.client.makeRequest({}, `/integrations?schemaId=${schemaId}&transform`, 'GET');
    }

    static createIntegrationForSchema(schemaId, label) {
        const integration = {
            schemaId, label
        };
        return this.client.makeRequest({}, '/integrations?transform', 'POST', integration);
    }

    static updateIntegration(integrationId, data) {
        return this.client.makeRequest({}, `/integrations/${integrationId}/formdata?transform`, 'POST', data);
    }

    static deleteIntegration(integrationId) {
        return this.client.makeRequest({}, `/integrations/${integrationId}`, 'DELETE');
    }

    static getResponseForIntegrationGetUrlByUrl(url) {
        return this.client.makeRequest({}, url, 'GET');
    }

    static getResponseForIntegrationGetUrlById(integrationId) {
        return this.client.makeRequest({}, `/integrations/${integrationId}/data`, 'GET');
    }
}
