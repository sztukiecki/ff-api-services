"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("../http");
var MultimediaService = /** @class */ (function () {
    function MultimediaService() {
    }
    /**
     * Upload a file for a entity
     *
     * @param file
     * @param companyId
     * @param entityId
     * @returns
     *      the url to request this file
     */
    MultimediaService.upload = function (file, companyId, entityId) {
        var formData = new FormData();
        formData.append('file', file);
        return this.client.makeRequest("/" + companyId + "/" + entityId, 'POST', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    };
    MultimediaService.client = new http_1.default(http_1.APIMapping.multimediaService);
    return MultimediaService;
}());
exports.default = MultimediaService;
//# sourceMappingURL=MultimediaService.js.map