"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("../http");
var SchemaService = /** @class */ (function () {
    function SchemaService() {
    }
    SchemaService.loadStats = function (withGroups) {
        if (withGroups === void 0) { withGroups = false; }
        var additionalParams = withGroups ? { queryParams: { groups: 'true' } } : undefined;
        return SchemaService.client.makeRequest({}, '/stats', 'GET', undefined, additionalParams);
    };
    SchemaService.getAllSchemas = function (withGroups) {
        if (withGroups === void 0) { withGroups = false; }
        var queryParams = {
            transform: true
        };
        if (withGroups) {
            queryParams.groups = 'true';
        }
        return SchemaService.client.makeRequest({}, '/schemas', 'GET', undefined, { queryParams: queryParams });
    };
    SchemaService.getDataBySchemaId = function (schemaId, page, size) {
        if (page === void 0) { page = 1; }
        if (size === void 0) { size = null; }
        return SchemaService.client.makeRequest({}, "/data/" + schemaId, 'GET', undefined, {
            queryParams: {
                page: page,
                size: size
            }
        });
    };
    SchemaService.getSchema = function (schemaId, queryParams) {
        if (queryParams === void 0) { queryParams = {}; }
        queryParams.transform = true;
        return SchemaService.client.makeRequest({}, "/schemas/" + schemaId, 'GET', undefined, { queryParams: queryParams });
    };
    SchemaService.createSchema = function (schema) {
        return SchemaService.client.makeRequest({}, '/schemas?transform=true', 'POST', schema);
    };
    SchemaService.deleteSchema = function (schemaId) {
        return SchemaService.client.makeRequest({}, "/schemas/" + schemaId, 'DELETE');
    };
    SchemaService.updateSchema = function (schema) {
        return SchemaService.client.makeRequest({}, "/schemas/" + schema.id + "?transform=true", 'PUT', schema);
    };
    SchemaService.getIntegrationsForSchema = function (schemaId) {
        return SchemaService.client.makeRequest({}, "/integrations?schemaId=" + schemaId + "&transform=true", 'GET');
    };
    SchemaService.createIntegrationForSchema = function (schemaId, label) {
        var integration = {
            schemaId: schemaId, label: label
        };
        return SchemaService.client.makeRequest({}, '/integrations?transform=true', 'POST', integration);
    };
    SchemaService.updateIntegration = function (integrationId, data) {
        return SchemaService.client.makeRequest({}, "/integrations/" + integrationId + "/formdata?transform=true", 'POST', data);
    };
    SchemaService.deleteIntegration = function (integrationId) {
        return SchemaService.client.makeRequest({}, "/integrations/" + integrationId, 'DELETE');
    };
    SchemaService.getResponseForIntegrationGetUrlByUrl = function (url) {
        return SchemaService.client.makeRequest({}, url, 'GET');
    };
    SchemaService.getResponseForIntegrationGetUrlById = function (integrationId) {
        return SchemaService.client.makeRequest({}, "/integrations/" + integrationId + "/data", 'GET');
    };
    SchemaService.client = new http_1.default(http_1.APIMapping.schemaService);
    return SchemaService;
}());
exports.default = SchemaService;
//# sourceMappingURL=SchemaService.js.map