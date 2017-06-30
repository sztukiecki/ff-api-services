var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import HttpClient, { APIMapping } from '../http';

var EmailService = (_temp = _class = function () {
    function EmailService() {
        _classCallCheck(this, EmailService);
    }

    _createClass(EmailService, null, [{
        key: 'createDomain',
        value: function createDomain(domain) {
            return this.client.makeRequestSimple({ domain: domain }, '/configuration/whitelabel', 'POST').then(function (_ref) {
                var data = _ref.data;
                return data;
            });
        }
    }, {
        key: 'verifyDomain',
        value: function verifyDomain(domain) {
            return this.client.makeRequestSimple({ domain: domain }, '/configuration/whitelabel/verify', 'POST').then(function (_ref2) {
                var data = _ref2.data;
                return data;
            });
        }
    }]);

    return EmailService;
}(), _class.client = new HttpClient(APIMapping.emailService), _temp);
export { EmailService as default };