"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("../http");
var EntityService = (function () {
    function EntityService() {
    }
    EntityService.createEntity = function (schemaId, entity) {
        return EntityService.client.makeRequest("/schemas/" + schemaId, 'POST', entity || {});
    };
    /**
     * Delete a entity in the Backend
     * @param entityId
     * @param schemaId
     */
    EntityService.deleteEntity = function (entityId, schemaId) {
        return EntityService.client.makeRequest("/schemas/" + schemaId + "/entities/" + entityId, 'DELETE');
    };
    /**
     * Update a entity in the backend
     * @param schemaId
     * @param entityId
     * @param entity
     * @returns {*}
     */
    EntityService.updateEntityField = function (schemaId, entityId, field) {
        return EntityService.client.makeRequest("/schemas/" + schemaId + "/entities/" + entityId, 'PATCH', field);
    };
    EntityService.getEntityWithViewDefinition = function (viewId, schemaId, entityId) {
        return EntityService.client.makeRequest("/views/" + viewId + "/schemas/" + schemaId + "/entities/" + entityId, 'GET');
    };
    EntityService.getEntity = function (schemaId, entityId) {
        return EntityService.client.makeRequest("/schemas/" + schemaId + "/entities/" + entityId, 'GET');
    };
    /**
     * Get the history of a entity in a well formatted form.
     * @param schemaId
     * @param entityId
     * @param page
     *  the current page
     * @returns {*}
     */
    EntityService.getHistory = function (schemaId, entityId, page) {
        return EntityService.client.makeRequest("/schemas/" + schemaId + "/entities/" + entityId + "/history?page=" + page + "&size=15&order=DESC", 'GET');
    };
    EntityService.client = new http_1.default(http_1.APIMapping.entityService);
    return EntityService;
}());
exports.default = EntityService;
//# sourceMappingURL=EntityService.js.map