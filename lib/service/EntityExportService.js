var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import HttpClient, { APIMapping } from 'http';

var EntityExportService = function () {
    function EntityExportService() {
        _classCallCheck(this, EntityExportService);

        this.client = new HttpClient(APIMapping.entityExportService);
    }

    _createClass(EntityExportService, [{
        key: 'exportAsCsv',
        value: function exportAsCsv(indexName) {
            return this.client.makeRequest({}, '/export/' + indexName, 'GET').then(function (s) {
                return s.data.csv;
            });
        }
    }]);

    return EntityExportService;
}();

export { EntityExportService as default };
module.exports = exports['default'];