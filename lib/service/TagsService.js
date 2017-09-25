"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("../http");
var TagService = /** @class */ (function () {
    function TagService() {
    }
    TagService.getAllTags = function () {
        return this.client.makeRequestSimple({}, '/tags', 'GET').then(function (s) { return s.data; });
    };
    TagService.createTag = function (body) {
        return this.client.makeRequestSimple(body, '/tags', 'POST').then(function (s) { return s.data; });
    };
    TagService.getTagById = function (id) {
        return this.client.makeRequestSimple({}, "/tags/" + id, 'GET').then(function (s) { return s.data; });
    };
    TagService.updateTag = function (body, id) {
        return this.client.makeRequestSimple(body, "/tags/" + id, 'PUT').then(function (s) { return s.data; });
    };
    TagService.client = new http_1.default(http_1.APIMapping.tagService);
    return TagService;
}());
exports.default = TagService;
//# sourceMappingURL=TagsService.js.map