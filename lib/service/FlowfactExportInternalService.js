"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("../http");
var FlowfactExportInternalService = /** @class */ (function () {
    function FlowfactExportInternalService() {
    }
    FlowfactExportInternalService.createAdminUser = function (createAdminTokenRequest) {
        console.log('Test');
        console.log(createAdminTokenRequest);
        return FlowfactExportInternalService.client.makeRequest('/adminUser', 'POST', createAdminTokenRequest);
    };
    FlowfactExportInternalService.client = new http_1.default(http_1.APIMapping.flowfactExporterInternalService);
    return FlowfactExportInternalService;
}());
exports.default = FlowfactExportInternalService;
//# sourceMappingURL=FlowfactExportInternalService.js.map