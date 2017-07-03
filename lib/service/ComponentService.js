"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("../http");
var ComponentService = (function () {
    function ComponentService() {
    }
    ComponentService.getComponents = function (viewName) {
        return ComponentService.client.makeRequest({}, "/components?viewName=" + viewName, 'GET');
    };
    /**
     *
     * The data format looks like this:
     * {
     *      "id": ...,
     *      "viewName": ...,
     *      "niceName": ...,
     *      "url": ...,
     *      "pluginType": ...,
     *      "pluginScope": ...,
     *      "schemaId": ...
     * }
     *
     * @param data
     */
    ComponentService.createComponent = function (data) {
        return ComponentService.client.makeRequest({}, '/components', 'POST', data);
    };
    ComponentService.deleteComponent = function (id) {
        return ComponentService.client.makeRequest({}, "/components/" + id, 'DELETE');
    };
    ComponentService.client = new http_1.default(http_1.APIMapping.componentService);
    return ComponentService;
}());
exports.default = ComponentService;
//# sourceMappingURL=ComponentService.js.map