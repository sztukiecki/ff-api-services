var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import HttpClient, { APIMapping } from '../http';

var PresetService = (_temp = _class = function () {
    function PresetService() {
        _classCallCheck(this, PresetService);
    }

    _createClass(PresetService, null, [{
        key: 'getPresets',
        value: function getPresets() {
            return this.client.makeRequestSimple({}, '/preset', 'GET').then(function (s) {
                return s.data;
            });
        }
    }]);

    return PresetService;
}(), _class.client = new HttpClient(APIMapping.presetService), _temp);
export { PresetService as default };