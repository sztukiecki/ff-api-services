var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import HttpClient, { APIMapping } from 'http';

var PresetService = function () {
    function PresetService() {
        _classCallCheck(this, PresetService);

        this.client = new HttpClient(APIMapping.presetService);
    }

    _createClass(PresetService, [{
        key: 'getPresets',
        value: function getPresets() {
            return this.client.makeRequetSimple({}, '/preset', 'GET').then(function (s) {
                return s.data;
            });
        }
    }]);

    return PresetService;
}();

export { PresetService as default };
module.exports = exports['default'];