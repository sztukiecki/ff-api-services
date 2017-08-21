"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("../http");
var ActivityService = /** @class */ (function () {
    function ActivityService() {
    }
    ActivityService.getAllActivities = function (page, size) {
        if (page === void 0) { page = undefined; }
        if (size === void 0) { size = undefined; }
        var searchQuery = {};
        if (typeof page === 'number' && typeof size === 'number') {
            searchQuery = {
                page: page,
                size: size
            };
        }
        return ActivityService.client.makeRequest('/activities', 'GET').then(function (s) { return s.data; });
    };
    ActivityService.getActiveActivities = function (page, size) {
        if (page === void 0) { page = undefined; }
        if (size === void 0) { size = undefined; }
        var searchQuery = {};
        if (typeof page === 'number' && typeof size === 'number') {
            searchQuery = {
                page: page,
                size: size
            };
        }
        return ActivityService.client.makeRequest('/activities/active', 'GET').then(function (s) { return s.data; });
    };
    ActivityService.searchActivities = function (search, searchQuery, page, size) {
        if (searchQuery === void 0) { searchQuery = {}; }
        if (page === void 0) { page = undefined; }
        if (size === void 0) { size = undefined; }
        if (search !== null && search.length > 0) {
            searchQuery.q = search;
        }
        else {
            searchQuery.q = ''; // important, because else the api doesn't even send the body... :(
        }
        if (typeof page === 'number' && typeof size === 'number') {
            searchQuery.page = page;
            searchQuery.size = size;
        }
        return ActivityService.client.makeRequestSimple(searchQuery, '/activities/search', 'POST').then(function (s) { return s.data; });
    };
    ActivityService.getActivityById = function (id) {
        return ActivityService.client.makeRequestSimple({}, "/activities/" + id, 'GET').then(function (s) { return s.data; });
    };
    ActivityService.createActivity = function (body) {
        return ActivityService.client.makeRequestSimple(body, '/activities', 'POST').then(function (s) { return s.data; });
    };
    ActivityService.updateActivity = function (body) {
        return ActivityService.client.makeRequestSimple(body, "/activities/" + body.id, 'PUT').then(function (s) { return s.data; });
    };
    ActivityService.deleteActivity = function (id) {
        return ActivityService.client.makeRequestSimple({}, "/activities/" + id, 'DELETE').then(function (s) { return s.data; });
    };
    ActivityService.client = new http_1.default(http_1.APIMapping.activityService);
    return ActivityService;
}());
exports.default = ActivityService;
//# sourceMappingURL=ActivityService.js.map