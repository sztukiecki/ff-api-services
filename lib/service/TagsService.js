var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import HttpClient, { APIMapping } from 'http';

var TagService = function () {
    function TagService() {
        _classCallCheck(this, TagService);

        this.client = new HttpClient(APIMapping.tagService);
    }

    _createClass(TagService, [{
        key: 'getAllTags',
        value: function getAllTags() {
            return this.client.makeRequetSimple({}, '/tags', 'GET').then(function (s) {
                return s.data;
            });
        }
    }, {
        key: 'createTag',
        value: function createTag(body) {
            return this.client.makeRequetSimple(body, '/tags', 'POST').then(function (s) {
                return s.data;
            });
        }
    }, {
        key: 'getTagById',
        value: function getTagById(id) {
            return this.client.makeRequetSimple({}, '/tags/' + id, 'GET').then(function (s) {
                return s.data;
            });
        }
    }, {
        key: 'updateTag',
        value: function updateTag(body, id) {
            return this.client.makeRequetSimple(body, '/tags/' + id, 'PUT').then(function (s) {
                return s.data;
            });
        }
    }]);

    return TagService;
}();

export { TagService as default };
module.exports = exports['default'];