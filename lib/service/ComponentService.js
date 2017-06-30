var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import HttpClient, { APIMapping } from '../http';

var ComponentService = (_temp = _class = function () {
    function ComponentService() {
        _classCallCheck(this, ComponentService);
    }

    _createClass(ComponentService, null, [{
        key: 'getComponents',
        value: function getComponents(viewName) {
            return this.client.makeRequest({}, '/components?viewName=' + viewName, 'GET');
        }

        /**
         *
         * The data format looks like this:
         * {
         *      "id": ...,
         *      "viewName": ...,
         *      "niceName": ...,
         *      "url": ...,
         *      "pluginType": ...,
         *      "pluginScope": ...,
         *      "schemaId": ...
         * }
         *
         * @param data
         */

    }, {
        key: 'createComponent',
        value: function createComponent(data) {
            return this.client.makeRequest({}, '/components', 'POST', data);
        }
    }, {
        key: 'deleteComponent',
        value: function deleteComponent(id) {
            return this.client.makeRequest({}, '/components/' + id, 'DELETE');
        }
    }]);

    return ComponentService;
}(), _class.client = new HttpClient(APIMapping.componentService), _temp);
export { ComponentService as default };