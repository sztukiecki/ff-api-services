var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import HttpClient, { APIMapping } from '../http';

var FlowfactExportInternalService = (_temp = _class = function () {
    function FlowfactExportInternalService() {
        _classCallCheck(this, FlowfactExportInternalService);
    }

    _createClass(FlowfactExportInternalService, null, [{
        key: 'createAdminUser',
        value: function createAdminUser(createAdminTokenRequest) {
            console.log('Test');
            console.log(createAdminTokenRequest);
            return FlowfactExportInternalService.client.makeRequest({}, '/adminUser', 'POST', createAdminTokenRequest);
        }
    }]);

    return FlowfactExportInternalService;
}(), _class.client = new HttpClient(APIMapping.flowfactExporterInternalService), _temp);
export { FlowfactExportInternalService as default };