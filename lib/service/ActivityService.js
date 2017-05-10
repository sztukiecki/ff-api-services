var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import HttpClient, { APIMapping } from '../http';

var ActivityService = function () {
    function ActivityService() {
        _classCallCheck(this, ActivityService);

        this.client = new HttpClient(APIMapping.activityService);
    }

    _createClass(ActivityService, [{
        key: 'getAllActivities',
        value: function getAllActivities() {
            var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
            var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

            var searchQuery = {};
            if (typeof page === 'number' && typeof size === 'number') {
                searchQuery = {
                    page: page,
                    size: size
                };
            }
            return this.client.makeRequest(searchQuery, '/activities', 'GET').then(function (s) {
                return s.data;
            });
        }
    }, {
        key: 'getActiveActivities',
        value: function getActiveActivities() {
            var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
            var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

            var searchQuery = {};
            if (typeof page === 'number' && typeof size === 'number') {
                searchQuery = {
                    page: page,
                    size: size
                };
            }
            return this.client.makeRequest(searchQuery, '/activities/active', 'GET').then(function (s) {
                return s.data;
            });
        }
    }, {
        key: 'searchActivities',
        value: function searchActivities(search) {
            var searchQuery = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var page = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
            var size = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

            if (search !== null && search.length > 0) {
                searchQuery.q = search;
            } else {
                searchQuery.q = ''; // important, because else the api doesn't even send the body... :(
            }

            if (typeof page === 'number' && typeof size === 'number') {
                searchQuery.page = page;
                searchQuery.size = size;
            }
            return this.client.makeRequetSimple(searchQuery, '/activities/search', 'POST').then(function (s) {
                return s.data;
            });
        }
    }, {
        key: 'getActivityById',
        value: function getActivityById(id) {
            return this.client.makeRequetSimple({}, '/activities/' + id, 'GET').then(function (s) {
                return s.data;
            });
        }
    }, {
        key: 'createActivity',
        value: function createActivity(body) {
            return this.client.makeRequetSimple(body, '/activities', 'POST').then(function (s) {
                return s.data;
            });
        }
    }, {
        key: 'updateActivity',
        value: function updateActivity(body) {
            return this.client.makeRequetSimple(body, '/activities/' + body.id, 'PUT').then(function (s) {
                return s.data;
            });
        }
    }, {
        key: 'deleteActivity',
        value: function deleteActivity(id) {
            return this.client.makeRequetSimple({}, '/activities/' + id, 'DELETE').then(function (s) {
                return s.data;
            });
        }
    }]);

    return ActivityService;
}();

export { ActivityService as default };