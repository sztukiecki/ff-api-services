var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import HttpClient, { APIMapping } from '../http';

var EntitySchemaService = (_temp = _class = function () {
    function EntitySchemaService() {
        _classCallCheck(this, EntitySchemaService);
    }

    _createClass(EntitySchemaService, null, [{
        key: 'loadStats',
        value: function loadStats() {
            return EntitySchemaService.client.makeRequest({}, '/stats', 'GET');
        }
    }, {
        key: 'getAllSchemas',
        value: function getAllSchemas() {
            return EntitySchemaService.client.makeRequest({}, '/schemas', 'GET');
        }
    }, {
        key: 'getDataBySchemaId',
        value: function getDataBySchemaId(schemaId) {
            var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
            var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

            return EntitySchemaService.client.makeRequest({}, '/data/' + schemaId, 'GET', undefined, {
                queryParams: {
                    page: page,
                    size: size
                }
            });
        }
    }, {
        key: 'selectSchemaById',
        value: function selectSchemaById(schemaId) {
            return EntitySchemaService.client.makeRequest({}, '/schemas/' + schemaId, 'GET');
        }
    }, {
        key: 'createNewSchema',
        value: function createNewSchema(schema) {
            return EntitySchemaService.client.makeRequest({}, '/schemas', 'POST', schema);
        }
    }, {
        key: 'deleteSchema',
        value: function deleteSchema(schemaId) {
            return EntitySchemaService.client.makeRequest({}, '/schemas/' + schemaId, 'DELETE');
        }
    }, {
        key: 'updateSchema',
        value: function updateSchema(schema) {
            return EntitySchemaService.client.makeRequest({}, '/schemas/' + schema.id, 'PUT', schema);
        }
    }, {
        key: 'integrationsForSchemaId',
        value: function integrationsForSchemaId(schemaId) {
            return EntitySchemaService.client.makeRequest({}, '/integrations', 'GET', undefined, { queryParams: { schemaId: schemaId } });
        }
    }, {
        key: 'createNewIntegrationForSchema',
        value: function createNewIntegrationForSchema(schemaId, label) {
            var integration = { schemaId: schemaId, label: label };
            return EntitySchemaService.client.makeRequest({}, '/integrations', 'POST', integration);
        }
    }, {
        key: 'updateIntegration',
        value: function updateIntegration(integrationId, data) {
            return EntitySchemaService.client.makeRequest({}, '/integrations/' + integrationId + '/formdata', 'POST', data);
        }
    }, {
        key: 'deleteIntegration',
        value: function deleteIntegration(integrationId) {
            return EntitySchemaService.client.makeRequest({}, '/integrations/' + integrationId, 'DELETE');
        }
    }, {
        key: 'getResponseForIntegrationGetUrlByUrl',
        value: function getResponseForIntegrationGetUrlByUrl(url) {
            return EntitySchemaService.client.makeRequest({}, url, 'GET');
        }
    }, {
        key: 'getResponseForIntegrationGetUrlById',
        value: function getResponseForIntegrationGetUrlById(integrationId) {
            return EntitySchemaService.client.makeRequest({}, '/integrations/' + integrationId + '/data', 'GET');
        }
    }, {
        key: 'deleteEntity',
        value: function deleteEntity(entityId, schemaId) {
            return EntitySchemaService.client.makeRequest({}, '/data', 'DELETE', undefined, {
                queryParams: {
                    schemaId: schemaId,
                    entityId: entityId
                }
            });
        }
    }, {
        key: 'updateEntity',
        value: function updateEntity(schemaId, entityId, entity) {
            return EntitySchemaService.client.makeRequest({}, '/data/' + schemaId + '/entity/' + entityId, 'PUT', entity);
        }
    }]);

    return EntitySchemaService;
}(), _class.client = new HttpClient(APIMapping.entitySchemaService), _temp);
export { EntitySchemaService as default };