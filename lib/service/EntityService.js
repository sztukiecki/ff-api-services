"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("../http");
var EntityService = (function () {
    function EntityService() {
    }
    /**
     * Delete a entity in the Backend
     * @param entityId
     * @param schemaId
     */
    EntityService.deleteEntity = function (entityId, schemaId) {
        return EntityService.client.makeRequest({}, "/schemas/" + schemaId + "/entities/" + entityId, 'DELETE');
    };
    /**
     * Update a entity in the backend
     * @param schemaId
     * @param entityId
     * @param entity
     * @returns {*}
     */
    EntityService.updateEntity = function (schemaId, entityId, entity) {
        return EntityService.client.makeRequest({}, "/schemas/" + schemaId + "/entities/" + entityId, 'PUT', entity);
    };
    EntityService.getEntityWithViewDefinition = function (viewId, schemaId, entityId) {
        return EntityService.client.makeRequest({}, "/views/" + viewId + "/schemas/" + schemaId + "/entities/" + entityId, 'GET');
    };
    EntityService.client = new http_1.default(http_1.APIMapping.entityService);
    return EntityService;
}());
exports.default = EntityService;
//# sourceMappingURL=EntityService.js.map