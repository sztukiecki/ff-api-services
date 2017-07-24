var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import HttpClient, { APIMapping } from '../http';

var MultimediaService = (_temp = _class = function () {
    function MultimediaService() {
        _classCallCheck(this, MultimediaService);
    }

    _createClass(MultimediaService, null, [{
        key: 'upload',


        /**
         * Upload a file for a entity
         *
         * @param file
         * @param companyId
         * @param entityId
         * @returns
         *      the url to request this file
         */
        value: function upload(file, companyId, entityId) {
            var formData = new FormData();
            formData.append('file', file);

            return this.client.makeRequest({}, '/' + companyId + '/' + entityId, 'POST', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        }
    }]);

    return MultimediaService;
}(), _class.client = new HttpClient(APIMapping.multimediaService), _temp);
export { MultimediaService as default };