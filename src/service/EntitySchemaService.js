import HttpClient, {APIMapping} from 'http';

export default class EntitySchemaService {
    constructor() {
        this.client = new HttpClient(APIMapping.entitySchemaService);
    }

    loadStats() {
        return this.client.makeRequest({}, '/stats', 'GET');
    }

    getAllSchemas() {
        return this.client.makeRequest({}, '/schemas', 'GET');
    }

    getDataBySchemaId(schemaId, page = 1, size = null) {
        return this.client.makeRequest({}, `/data/${schemaId}`, 'GET', undefined, {
            queryParams: {
                page: page,
                size: size
            }
        });
    }

    selectSchemaById(schemaId) {
        return this.client.makeRequest({}, `/schemas/${schemaId}`, 'GET');
    }

    createNewSchema(schema) {
        return this.client.makeRequest({}, '/schemas', 'POST', schema);
    }

    deleteSchema(schemaId) {
        return this.client.makeRequest({}, `/schemas/${schemaId}`, 'DELETE');
    }

    updateSchema(schema) {
        return this.client.makeRequest({}, `/schemas/${schema.id}`, 'PUT', schema);
    }

    integrationsForSchemaId(schemaId) {
        return this.client.makeRequest({}, '/integrations', 'GET', undefined, {queryParams: {schemaId}});
    }

    createNewIntegrationForSchema(schemaId, label) {
        const integration = {schemaId, label};
        return this.client.makeRequest({}, '/integrations', 'POST', integration);
    }

    updateIntegration(integrationId, data) {
        return this.client.makeRequest({}, `/integrations/${integrationId}/formdata`, 'POST', data);
    }

    getResponseForIntegrationGetUrlByUrl(url) {
        return this.client.makeRequest({}, url, 'GET');
    }

    getResponseForIntegrationGetUrlById(integrationId) {
        return this.client.makeRequest({}, `/integrations/${integrationId}/data`, 'GET');
    }

    deleteEntity(entityId, schemaId) {
        return this.client.makeRequest({}, '/data', 'DELETE', undefined, {queryParams: {schemaId, entityId}});
    }
}