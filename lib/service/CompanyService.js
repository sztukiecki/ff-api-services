var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import HttpClient, {APIMapping} from '../http';

var CompanyService = (_temp = _class = function () {
    function CompanyService() {
        _classCallCheck(this, CompanyService);
    }

    _createClass(CompanyService, null, [{
        key: 'createCompany',

        //domain -> can also be an email
        value: function createCompany(companyName, companyUrl, domain) {
            return CompanyService.client.makeRequetSimple({
                companyName: companyName,
                companyUrl: companyUrl,
                domain: domain
            }, '/company', 'POST');
        }
    }, {
        key: 'usePreset',
        value: function usePreset(presets) {
            return CompanyService.client.makeRequetSimple({
                presets: presets
            }, '/company/usepreset', 'PUT');
        }
    }, {
        key: 'updateCompany',
        value: function updateCompany(body) {
            return CompanyService.client.makeRequetSimple(body, '/company', 'PUT');
        }
    }, {
        key: 'findCompany',
        value: function findCompany(companyId) {
            return CompanyService.client.makeRequetSimple({}, '/company/' + encodeURIComponent(companyId), 'GET');
        }
    }, {
        key: 'memberCountByEMailAddress',
        value: function memberCountByEMailAddress(mailaddress) {
            return CompanyService.client.makeRequetSimple({
                mailaddress: mailaddress
            }, '/company/numberOfUsers', 'PUT');
        }
    }]);

    return CompanyService;
}(), _class.client = new HttpClient(APIMapping.companyService), _temp);
export { CompanyService as default };


var StatusMapping = {
    create: {
        ALREADY_EXIST: 400,
        MANDANTORY_FIELD_NOT_FILLED: 422,
        INTERNAL_SERVER_ERROR: 500
    },
    findByEmail: {
        NO_COMPANY_FOUND: 204,
        INTERNAL_SERVER_ERROR: 500
    },
    findById: {
        ID_NOT_FOUND: 204,
        INTERNAL_SERVER_ERROR: 500
    }
};

export { StatusMapping };