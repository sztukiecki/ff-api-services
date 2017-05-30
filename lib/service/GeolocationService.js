var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import HttpClient, { APIMapping } from '../http';

var GeolocationService = (_temp = _class = function () {
    function GeolocationService() {
        _classCallCheck(this, GeolocationService);
    }

    _createClass(GeolocationService, null, [{
        key: 'getAutocompletionResults',
        value: function getAutocompletionResults(query, cancelToken) {
            var additionalParams = {
                queryParams: {
                    q: query
                },
                cancelToken: cancelToken
            };
            return GeolocationService.client.makeRequest({}, '/search', 'GET', undefined, additionalParams).then(function (s) {
                return s.data;
            });
        }
    }, {
        key: 'getBestMatchCoordinates',
        value: function getBestMatchCoordinates(query) {
            var additionalParams = {
                queryParams: {
                    q: query
                }
            };
            return GeolocationService.client.makeRequest({}, '/getBestMatchCoordinates', 'GET', undefined, additionalParams).then(function (s) {
                return s.data;
            });
        }
    }]);

    return GeolocationService;
}(), _class.client = new HttpClient(APIMapping.geolocationService), _temp);
export { GeolocationService as default };