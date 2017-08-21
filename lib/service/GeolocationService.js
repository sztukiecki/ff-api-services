"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("../http");
var GeolocationService = /** @class */ (function () {
    function GeolocationService() {
    }
    GeolocationService.getAutocompletionResults = function (query, cancelToken) {
        var additionalParams = {
            queryParams: {
                q: query
            },
            cancelToken: cancelToken
        };
        return GeolocationService.client.makeRequest('/search', 'GET', undefined, additionalParams).then(function (s) { return s.data; });
    };
    GeolocationService.getBestMatchCoordinates = function (query) {
        var additionalParams = {
            queryParams: {
                q: query
            }
        };
        return GeolocationService.client.makeRequest('/getBestMatchCoordinates', 'GET', undefined, additionalParams).then(function (s) { return s.data; });
    };
    GeolocationService.client = new http_1.default(http_1.APIMapping.geolocationService);
    return GeolocationService;
}());
exports.default = GeolocationService;
//# sourceMappingURL=GeolocationService.js.map