var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import HttpClient, { APIMapping } from '../http';

var SearchService = function () {
    function SearchService() {
        _classCallCheck(this, SearchService);

        this.client = new HttpClient(APIMapping.searchService);
    }

    _createClass(SearchService, [{
        key: 'search',
        value: function search(query, index) {
            if (typeof query === 'string') {
                query = JSON.parse(query);
            }
            return this.client.makeRequetSimple(query, '/index/' + index, 'POST');
        }
    }]);

    return SearchService;
}();

export { SearchService as default };