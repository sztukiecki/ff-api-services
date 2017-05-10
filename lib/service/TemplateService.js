var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import HttpClient, { APIMapping } from '../http';

var TemplateService = function () {
    function TemplateService() {
        _classCallCheck(this, TemplateService);

        this.client = new HttpClient(APIMapping.templateService);
    }

    _createClass(TemplateService, [{
        key: 'getAllTemplates',
        value: function getAllTemplates() {
            return this.client.makeRequetSimple({}, '/templates', 'GET').then(function (s) {
                return s.data;
            }).then(function (s) {
                return s ? s : [];
            });
        }
    }, {
        key: 'getTemplatesByType',
        value: function getTemplatesByType(type) {
            return this.client.makeRequetSimple({}, '/templates?templateType=' + type, 'GET').then(function (s) {
                return s.data;
            }).then(function (s) {
                return s ? s : [];
            });
        }
    }, {
        key: 'createTemplate',
        value: function createTemplate(body) {
            return this.client.makeRequetSimple(body, '/templates', 'POST').then(function (s) {
                return s.data;
            });
        }
    }, {
        key: 'uploadContent',
        value: function uploadContent(id, file) {
            var formData = new FormData();
            formData.append('file', file, file.name);

            return this.client.makeRequest({}, '/templates/' + id + '/content', 'PUT', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        }
    }, {
        key: 'getTemplateById',
        value: function getTemplateById(id) {
            return this.client.makeRequetSimple({}, '/templates/' + id, 'GET').then(function (s) {
                return s.data;
            });
        }
    }, {
        key: 'delete',
        value: function _delete(id) {
            return this.client.makeRequetSimple({}, '/templates/' + id, 'DELETE').then(function (s) {
                return s.data;
            });
        }
    }, {
        key: 'updateTemplate',
        value: function updateTemplate(body, id) {
            return this.client.makeRequetSimple(body, '/templates/' + id, 'PUT').then(function (s) {
                return s.data;
            });
        }
    }]);

    return TemplateService;
}();

export { TemplateService as default };