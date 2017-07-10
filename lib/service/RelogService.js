var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import HttpClient, { APIMapping } from '../http';

var RelogService = (_temp = _class = function () {
    function RelogService() {
        _classCallCheck(this, RelogService);
    }

    _createClass(RelogService, null, [{
        key: 'log',
        value: function log(logEntry) {
            return this.client.makeRequestSimple(logEntry, '/relog/elk-gelf', 'POST');
        }
    }, {
        key: 'logBatch',
        value: function logBatch(logEntries) {
            return this.client.makeRequestSimple({ _batch: logEntries }, '/relog/elk-gelf/batch', 'POST');
        }
    }]);

    return RelogService;
}(), _class.client = new HttpClient(APIMapping.relogService), _temp);
export { RelogService as default };