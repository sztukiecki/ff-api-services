"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("../http");
var FormService = /** @class */ (function () {
    function FormService() {
    }
    FormService.render = function (integrationId) {
        return FormService.client.makeRequestSimple({}, "/render/" + integrationId, 'POST').then(function (s) { return s.data; });
    };
    FormService.client = new http_1.default(http_1.APIMapping.formService);
    return FormService;
}());
exports.default = FormService;
//# sourceMappingURL=FormService.js.map