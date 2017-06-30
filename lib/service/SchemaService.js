var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import HttpClient, { APIMapping } from '../http';

var SchemaService = (_temp = _class = function () {
    function SchemaService() {
        _classCallCheck(this, SchemaService);
    }

    _createClass(SchemaService, null, [{
        key: 'loadStats',
        value: function loadStats() {
            var withGroups = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var additionalParams = withGroups ? { queryParams: { groups: 'true' } } : undefined;
            return SchemaService.client.makeRequest({}, '/stats', 'GET', undefined, additionalParams);
        }
    }, {
        key: 'getAllSchemas',
        value: function getAllSchemas() {
            var withGroups = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var queryParams = {
                transform: true
            };

            if (withGroups) {
                queryParams.groups = 'true';
            }
            return SchemaService.client.makeRequest({}, '/schemas', 'GET', undefined, { queryParams: queryParams });
        }
    }, {
        key: 'getDataBySchemaId',
        value: function getDataBySchemaId(schemaId) {
            var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
            var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

            return SchemaService.client.makeRequest({}, '/data/' + schemaId, 'GET', undefined, {
                queryParams: {
                    page: page,
                    size: size
                }
            });
        }
    }, {
        key: 'getSchema',
        value: function getSchema(schemaId) {
            return SchemaService.client.makeRequest({}, '/schemas/' + schemaId + '?transform', 'GET');
        }
    }, {
        key: 'createSchema',
        value: function createSchema(schema) {
            return SchemaService.client.makeRequest({}, '/schemas?transform', 'POST', schema);
        }
    }, {
        key: 'deleteSchema',
        value: function deleteSchema(schemaId) {
            return SchemaService.client.makeRequest({}, '/schemas/' + schemaId, 'DELETE');
        }
    }, {
        key: 'updateSchema',
        value: function updateSchema(schema) {
            return SchemaService.client.makeRequest({}, '/schemas/' + schema.id + '?transform', 'PUT', schema);
        }
    }, {
        key: 'getIntegrationsForSchema',
        value: function getIntegrationsForSchema(schemaId) {
            return SchemaService.client.makeRequest({}, '/integrations?schemaId=' + schemaId + '&transform', 'GET');
        }
    }, {
        key: 'createIntegrationForSchema',
        value: function createIntegrationForSchema(schemaId, label) {
            var integration = {
                schemaId: schemaId, label: label
            };
            return SchemaService.client.makeRequest({}, '/integrations?transform', 'POST', integration);
        }
    }, {
        key: 'updateIntegration',
        value: function updateIntegration(integrationId, data) {
            return SchemaService.client.makeRequest({}, '/integrations/' + integrationId + '/formdata?transform', 'POST', data);
        }
    }, {
        key: 'deleteIntegration',
        value: function deleteIntegration(integrationId) {
            return SchemaService.client.makeRequest({}, '/integrations/' + integrationId, 'DELETE');
        }
    }, {
        key: 'getResponseForIntegrationGetUrlByUrl',
        value: function getResponseForIntegrationGetUrlByUrl(url) {
            return SchemaService.client.makeRequest({}, url, 'GET');
        }
    }, {
        key: 'getResponseForIntegrationGetUrlById',
        value: function getResponseForIntegrationGetUrlById(integrationId) {
            return SchemaService.client.makeRequest({}, '/integrations/' + integrationId + '/data', 'GET');
        }

        /**
         * Method to get all complex datatypes defined in the backend.
         */

    }, {
        key: 'getComplexDataTypes',
        value: function getComplexDataTypes() {
            return SchemaService.client.makeRequest({}, '/datatypes', 'GET');
        }
    }]);

    return SchemaService;
}(), _class.client = new HttpClient(APIMapping.schemaService), _temp);
export { SchemaService as default };