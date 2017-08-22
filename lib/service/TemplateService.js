"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("../http");
var TemplateService = /** @class */ (function () {
    function TemplateService() {
    }
    TemplateService.getAllTemplates = function () {
        return this.client.makeRequestSimple({}, '/templates', 'GET').then(function (s) { return s.data; }).then(function (s) { return s ? s : []; });
    };
    TemplateService.getTemplatesByType = function (type) {
        return this.client.makeRequestSimple({}, "/templates?templateType=" + type, 'GET').then(function (s) { return s.data; }).then(function (s) { return s ? s : []; });
    };
    TemplateService.createTemplate = function (body) {
        return this.client.makeRequestSimple(body, '/templates', 'POST').then(function (s) { return s.data; });
    };
    TemplateService.uploadContent = function (id, file) {
        var formData = new FormData();
        formData.append('file', file, file.name);
        return this.client.makeRequest("/templates/" + id + "/content", 'POST', formData);
    };
    TemplateService.getTemplateById = function (id) {
        return this.client.makeRequestSimple({}, "/templates/" + id, 'GET').then(function (s) { return s.data; });
    };
    TemplateService.delete = function (id) {
        return this.client.makeRequestSimple({}, "/templates/" + id, 'DELETE').then(function (s) { return s.data; });
    };
    TemplateService.updateTemplate = function (body, id) {
        return this.client.makeRequestSimple(body, "/templates/" + id, 'PUT').then(function (s) { return s.data; });
    };
    TemplateService.client = new http_1.default(http_1.APIMapping.templateService);
    return TemplateService;
}());
exports.default = TemplateService;
//# sourceMappingURL=TemplateService.js.map