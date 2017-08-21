"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("../http");
var ViewDefinitionService = (function () {
    function ViewDefinitionService() {
    }
    ViewDefinitionService.getDefinitionsForSchema = function (schemaId) {
        return ViewDefinitionService.client.makeRequest('/views', 'GET', undefined, {
            queryParams: {
                schemaId: schemaId
            }
        });
    };
    ViewDefinitionService.getDefinition = function (viewDefinitionId) {
        return ViewDefinitionService.client.makeRequest("/views/" + viewDefinitionId, 'GET');
    };
    ViewDefinitionService.updateDefinition = function (viewDefinitionId, viewDefinition) {
        return ViewDefinitionService.client.makeRequest("/views/" + viewDefinitionId, 'PUT', viewDefinition);
    };
    ViewDefinitionService.createDefinition = function (viewDefinition) {
        return ViewDefinitionService.client.makeRequest('/views', 'POST', viewDefinition);
    };
    ViewDefinitionService.deleteDefinition = function (viewDefinitionId) {
        return ViewDefinitionService.client.makeRequest("/views/" + viewDefinitionId, 'DELETE');
    };
    ViewDefinitionService.updateCategory = function (viewId, categoryName, categoryDefinition) {
        return ViewDefinitionService.client.makeRequest("/views/" + viewId + "/categories/" + categoryName, 'PATCH', categoryDefinition);
    };
    ViewDefinitionService.addCategory = function (viewId, categoryDefinition) {
        return ViewDefinitionService.client.makeRequest("/views/" + viewId + "/categories", 'PATCH', categoryDefinition);
    };
    ViewDefinitionService.deleteCategory = function (viewId, categoryName) {
        return ViewDefinitionService.client.makeRequest("/views/" + viewId + "/categories/" + categoryName, 'DELETE');
    };
    ViewDefinitionService.client = new http_1.default(http_1.APIMapping.viewDefinitionService);
    return ViewDefinitionService;
}());
exports.default = ViewDefinitionService;
//# sourceMappingURL=ViewDefinitionService.js.map