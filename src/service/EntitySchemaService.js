import HttpClient, {APIMapping} from '../http';

export default class EntitySchemaService {
    static client = new HttpClient(APIMapping.entitySchemaService);

    static loadStats() {
        return EntitySchemaService.client.makeRequest({}, '/stats', 'GET');
    }

    static getAllSchemas() {
        return EntitySchemaService.client.makeRequest({}, '/schemas?transform', 'GET');
    }

    static getDataBySchemaId(schemaId, page = 1, size = null) {
        return EntitySchemaService.client.makeRequest({}, `/data/${schemaId}`, 'GET', undefined, {
            queryParams: {
                page: page,
                size: size
            }
        });
    }

    static selectSchemaById(schemaId) {
        return EntitySchemaService.client.makeRequest({}, `/schemas/${schemaId}?transform`, 'GET');
    }

    static createNewSchema(schema) {
        return EntitySchemaService.client.makeRequest({}, '/schemas?transform', 'POST', schema);
    }

    static deleteSchema(schemaId) {
        return EntitySchemaService.client.makeRequest({}, `/schemas/${schemaId}`, 'DELETE');
    }

    static updateSchema(schema) {
        return EntitySchemaService.client.makeRequest({}, `/schemas/${schema.id}?transform`, 'PUT', schema);
    }

    static integrationsForSchemaId(schemaId) {
        return EntitySchemaService.client.makeRequest({}, '/integrations', 'GET', undefined, {queryParams: {schemaId}});
    }

    static createNewIntegrationForSchema(schemaId, label) {
        const integration = {schemaId, label};
        return EntitySchemaService.client.makeRequest({}, '/integrations', 'POST', integration);
    }

    static updateIntegration(integrationId, data) {
        return EntitySchemaService.client.makeRequest({}, `/integrations/${integrationId}/formdata`, 'POST', data);
    }

    static deleteIntegration(integrationId) {
        return EntitySchemaService.client.makeRequest({}, `/integrations/${integrationId}`, 'DELETE');
    }

    static getResponseForIntegrationGetUrlByUrl(url) {
        return EntitySchemaService.client.makeRequest({}, url, 'GET');
    }

    static getResponseForIntegrationGetUrlById(integrationId) {
        return EntitySchemaService.client.makeRequest({}, `/integrations/${integrationId}/data`, 'GET');
    }

    static deleteEntity(entityId, schemaId) {
        return EntitySchemaService.client.makeRequest({}, '/data', 'DELETE', undefined, {
            queryParams: {
                schemaId,
                entityId
            }
        });
    }

    static updateEntity(schemaId, entityId, entity) {
        return EntitySchemaService.client.makeRequest({}, `/data/${schemaId}/entity/${entityId}`, 'PUT', entity);
    }
}