var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import HttpClient, { APIMapping } from '../http';

var EntityService = (_temp = _class = function () {
    function EntityService() {
        _classCallCheck(this, EntityService);
    }

    _createClass(EntityService, null, [{
        key: 'createEntity',
        value: function createEntity(schemaId) {
            return EntityService.client.makeRequest({}, '/schemas/' + schemaId, 'POST');
        }

        /**
         * Delete a entity in the Backend
         * @param entityId
         * @param schemaId
         */

    }, {
        key: 'deleteEntity',
        value: function deleteEntity(entityId, schemaId) {
            return EntityService.client.makeRequest({}, '/schemas/' + schemaId + '/entities/' + entityId, 'DELETE');
        }

        /**
         * Update a entity in the backend
         * @param schemaId
         * @param entityId
         * @param entity
         * @returns {*}
         */

    }, {
        key: 'updateEntityField',
        value: function updateEntityField(schemaId, entityId, field) {
            return EntityService.client.makeRequest({}, '/schemas/' + schemaId + '/entities/' + entityId, 'PATCH', field);
        }
    }, {
        key: 'getEntityWithViewDefinition',
        value: function getEntityWithViewDefinition(viewId, schemaId, entityId) {
            return EntityService.client.makeRequest({}, '/views/' + viewId + '/schemas/' + schemaId + '/entities/' + entityId, 'GET');
        }
    }]);

    return EntityService;
}(), _class.client = new HttpClient(APIMapping.entityService), _temp);
export { EntityService as default };