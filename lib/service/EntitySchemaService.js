var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import HttpClient, { APIMapping } from 'http';

var EntitySchemaService = function () {
    function EntitySchemaService() {
        _classCallCheck(this, EntitySchemaService);

        this.client = new HttpClient(APIMapping.entitySchemaService);
    }

    _createClass(EntitySchemaService, [{
        key: 'loadStats',
        value: function loadStats() {
            return this.client.makeRequest({}, '/stats', 'GET');
        }
    }, {
        key: 'getAllSchemas',
        value: function getAllSchemas() {
            return this.client.makeRequest({}, '/schemas', 'GET');
        }
    }, {
        key: 'getDataBySchemaId',
        value: function getDataBySchemaId(schemaId) {
            var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
            var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

            return this.client.makeRequest({}, '/data/' + schemaId, 'GET', undefined, {
                queryParams: {
                    page: page,
                    size: size
                }
            });
        }
    }, {
        key: 'selectSchemaById',
        value: function selectSchemaById(schemaId) {
            return this.client.makeRequest({}, '/schemas/' + schemaId, 'GET');
        }
    }, {
        key: 'createNewSchema',
        value: function createNewSchema(schema) {
            return this.client.makeRequest({}, '/schemas', 'POST', schema);
        }
    }, {
        key: 'deleteSchema',
        value: function deleteSchema(schemaId) {
            return this.client.makeRequest({}, '/schemas/' + schemaId, 'DELETE');
        }
    }, {
        key: 'updateSchema',
        value: function updateSchema(schema) {
            return this.client.makeRequest({}, '/schemas/' + schema.id, 'PUT', schema);
        }
    }, {
        key: 'integrationsForSchemaId',
        value: function integrationsForSchemaId(schemaId) {
            return this.client.makeRequest({}, '/integrations', 'GET', undefined, { queryParams: { schemaId: schemaId } });
        }
    }, {
        key: 'createNewIntegrationForSchema',
        value: function createNewIntegrationForSchema(schemaId, label) {
            var integration = { schemaId: schemaId, label: label };
            return this.client.makeRequest({}, '/integrations', 'POST', integration);
        }
    }, {
        key: 'updateIntegration',
        value: function updateIntegration(integrationId, data) {
            return this.client.makeRequest({}, '/integrations/' + integrationId + '/formdata', 'POST', data);
        }
    }, {
        key: 'getResponseForIntegrationGetUrlByUrl',
        value: function getResponseForIntegrationGetUrlByUrl(url) {
            return this.client.makeRequest({}, url, 'GET');
        }
    }, {
        key: 'getResponseForIntegrationGetUrlById',
        value: function getResponseForIntegrationGetUrlById(integrationId) {
            return this.client.makeRequest({}, '/integrations/' + integrationId + '/data', 'GET');
        }
    }, {
        key: 'deleteEntity',
        value: function deleteEntity(entityId, schemaId) {
            return this.client.makeRequest({}, '/data', 'DELETE', undefined, { queryParams: { schemaId: schemaId, entityId: entityId } });
        }
    }]);

    return EntitySchemaService;
}();

export { EntitySchemaService as default };
module.exports = exports['default'];