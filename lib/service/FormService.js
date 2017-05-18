var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import HttpClient, {APIMapping} from '../http';

var FormService = (_temp = _class = function () {
    function FormService() {
        _classCallCheck(this, FormService);
    }

    _createClass(FormService, null, [{
        key: 'render',
        value: function render(integrationId) {
            return FormService.client.makeRequetSimple({}, '/render/' + integrationId, 'POST').then(function (s) {
                return s.data;
            });
        }
    }]);

    return FormService;
}(), _class.client = new HttpClient(APIMapping.formService), _temp);
export { FormService as default };