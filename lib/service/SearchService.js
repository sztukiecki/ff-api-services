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
        key: 'getQuery',
        value: function getQuery(filter) {
            if (!filter) {
                return {
                    query: {
                        'match_all': {}
                    }
                };
            } else {
                return {
                    query: {
                        'match_phrase': {
                            _all: filter
                        }
                    }
                };
            }
        }
    }]);

    return SearchService;
}(), _class.client = new HttpClient(APIMapping.searchService), _temp);
export { SearchService as default };