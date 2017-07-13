var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import HttpClient, { APIMapping } from '../http';

var SearchService = (_temp = _class = function () {
    function SearchService() {
        _classCallCheck(this, SearchService);
    }

    _createClass(SearchService, null, [{
        key: 'getSearches',


        /**
         * Get all searches as short searches. Just the ID and the Name of the search
         * will be returned in a array.
         */
        value: function getSearches() {
            return this.client.makeRequest({}, '/search', 'GET');
        }

        /**
         * Get the full search information by id.
         * @param searchId
         */

    }, {
        key: 'getSearch',
        value: function getSearch(searchId) {
            return this.client.makeRequest({}, '/search/' + searchId, 'GET');
        }

        /**
         * Save a search
         * @param searchModel
         * @returns {*}
         */

    }, {
        key: 'saveSearch',
        value: function saveSearch(searchModel) {
            return this.client.makeRequestSimple(searchModel, '/search', 'POST');
        }

        /**
         * Delete a search
         * @param searchId
         * @returns {*}
         */

    }, {
        key: 'deleteSearch',
        value: function deleteSearch(searchId) {
            return this.client.makeRequest({}, '/search/' + searchId, 'DELETE');
        }
    }, {
        key: 'updateSearch',
        value: function updateSearch(searchId, searchModel) {
            return this.client.makeRequestSimple(searchModel, '/search/' + searchId, 'PUT');
        }
    }, {
        key: 'search',
        value: function search(query, index) {
            var page = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
            var size = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

            if (typeof query === 'string') {
                query = JSON.parse(query);
            }
            return this.client.makeRequestSimple(query, '/index/' + index, 'POST');
        }
    }, {
        key: 'filter',
        value: function filter(index) {
            var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
            var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
            var _filter = arguments[3];

            return this.client.makeRequest({}, '/index/' + index, 'POST', this.getQuery(_filter), {
                queryParams: {
                    page: page,
                    size: size
                }
            });
        }
    }, {
        key: 'getQuery',
        value: function getQuery(filter) {
            if (!filter) {
                return {
                    query: {
                        'match_all': {}
                    }
                };
            }
            return {
                query: {
                    'match_phrase': {
                        _all: filter
                    }
                }
            };
        }
    }]);

    return SearchService;
}(), _class.client = new HttpClient(APIMapping.searchService), _temp);
export { SearchService as default };