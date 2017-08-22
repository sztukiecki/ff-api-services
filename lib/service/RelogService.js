"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("../http");
var RelogService = /** @class */ (function () {
    function RelogService() {
    }
    RelogService.log = function (logEntry) {
        return this.client.makeRequestSimple(logEntry, '/relog/elk-gelf', 'POST');
    };
    RelogService.logBatch = function (logEntries) {
        return this.client.makeRequestSimple({ batch: logEntries }, '/relog/elk-gelf/batch', 'POST');
    };
    RelogService.client = new http_1.default(http_1.APIMapping.relogService);
    return RelogService;
}());
exports.default = RelogService;
//# sourceMappingURL=RelogService.js.map