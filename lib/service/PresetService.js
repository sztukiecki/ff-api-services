"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("../http");
var PresetService = (function () {
    function PresetService() {
    }
    PresetService.getPresets = function () {
        return PresetService.client.makeRequestSimple({}, '/preset', 'GET').then(function (s) { return s.data; });
    };
    PresetService.client = new http_1.default(http_1.APIMapping.presetService);
    return PresetService;
}());
exports.default = PresetService;
//# sourceMappingURL=PresetService.js.map