var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import HttpClient, { APIMapping } from '../http';

var ViewDefinitionService = (_temp = _class = function () {
    function ViewDefinitionService() {
        _classCallCheck(this, ViewDefinitionService);
    }

    _createClass(ViewDefinitionService, null, [{
        key: 'getDefinitionsForSchema',
        value: function getDefinitionsForSchema(schemaId) {
            return ViewDefinitionService.client.makeRequest({}, '/views', 'GET', undefined, {
                queryParams: {
                    schemaId: schemaId
                }
            });
        }
    }, {
        key: 'getDefinition',
        value: function getDefinition(viewDefinitionId) {
            return ViewDefinitionService.client.makeRequest({}, '/views/' + viewDefinitionId, 'GET');
        }
    }, {
        key: 'updateDefinition',
        value: function updateDefinition(viewDefinitionId, viewDefinition) {
            return ViewDefinitionService.client.makeRequest({}, '/views/' + viewDefinitionId, 'PUT', viewDefinition);
        }
    }, {
        key: 'createDefinition',
        value: function createDefinition(viewDefinition) {
            return ViewDefinitionService.client.makeRequest({}, '/views', 'POST', viewDefinition);
        }
    }, {
        key: 'deleteDefinition',
        value: function deleteDefinition(viewDefinitionId) {
            return ViewDefinitionService.client.makeRequest({}, '/views/' + viewDefinitionId, 'DELETE');
        }
    }, {
        key: 'updateCategory',
        value: function updateCategory(viewId, categoryName, categoryDefinition) {
            return ViewDefinitionService.client.makeRequest({}, '/views/' + viewId + '/categories/' + categoryName, 'PATCH', categoryDefinition);
        }
    }, {
        key: 'addCategory',
        value: function addCategory(viewId, categoryDefinition) {
            return ViewDefinitionService.client.makeRequest({}, '/views/' + viewId + '/categories', 'PATCH', categoryDefinition);
        }
    }, {
        key: 'deleteCategory',
        value: function deleteCategory(viewId, categoryName) {
            return ViewDefinitionService.client.makeRequest({}, '/views/' + viewId + '/categories/' + categoryName, 'DELETE');
        }
    }]);

    return ViewDefinitionService;
}(), _class.client = new HttpClient(APIMapping.viewDefinitionService), _temp);
export { ViewDefinitionService as default };