"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("../http");
var SearchService = (function () {
    function SearchService() {
    }
    /**
     * Get all searches as short searches. Just the ID and the Name of the search
     * will be returned in a array.
     */
    SearchService.getSearches = function () {
        return this.client.makeRequest({}, '/search', 'GET');
    };
    /**
     * Get the full search information by id.
     * @param searchId
     */
    SearchService.getSearch = function (searchId) {
        return this.client.makeRequest({}, "/search/" + searchId, 'GET');
    };
    /**
     * Save a search
     * @param searchModel
     * @returns {*}
     */
    SearchService.saveSearch = function (searchModel) {
        return this.client.makeRequestSimple(searchModel, '/search', 'POST');
    };
    /**
     * Delete a search
     * @param searchId
     * @returns {*}
     */
    SearchService.deleteSearch = function (searchId) {
        return this.client.makeRequest({}, "/search/" + searchId, 'DELETE');
    };
    SearchService.updateSearch = function (searchId, searchModel) {
        return this.client.makeRequestSimple(searchModel, "/search/" + searchId, 'PUT');
    };
    SearchService.search = function (query, index, page, size) {
        if (page === void 0) { page = 1; }
        if (size === void 0) { size = null; }
        if (typeof query === 'string') {
            query = JSON.parse(query);
        }
        return this.client.makeRequestSimple(query, '/index/' + index, 'POST');
    };
    SearchService.filter = function (index, page, size, filter) {
        if (page === void 0) { page = 1; }
        if (size === void 0) { size = null; }
        return this.client.makeRequest({}, '/index/' + index, 'POST', this.getQuery(filter), {
            queryParams: {
                page: page,
                size: size
            }
        });
    };
    SearchService.getQuery = function (filter) {
        if (!filter) {
            return {
                query: {
                    'match_all': {}
                }
            };
        }
        else {
            return {
                query: {
                    'match_phrase': {
                        _all: filter
                    }
                }
            };
        }
    };
    SearchService.client = new http_1.default(http_1.APIMapping.searchService);
    return SearchService;
}());
exports.default = SearchService;
//# sourceMappingURL=SearchService.js.map