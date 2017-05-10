var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import HttpClient, { APIMapping } from '../http';

var CompanyService = function () {
    function CompanyService() {
        _classCallCheck(this, CompanyService);

        this.client = new HttpClient(APIMapping.companyService);
    }

    //domain -> can also be an email


    _createClass(CompanyService, [{
        key: 'createCompany',
        value: function createCompany(companyName, companyUrl, domain) {
            return this.client.makeRequetSimple({
                companyName: companyName,
                companyUrl: companyUrl,
                domain: domain
            }, '/company', 'POST');
        }
    }, {
        key: 'usePreset',
        value: function usePreset(presets) {
            return this.client.makeRequetSimple({
                presets: presets
            }, '/company/usepreset', 'PUT');
        }
    }, {
        key: 'updateCompany',
        value: function updateCompany(body) {
            return this.client.makeRequetSimple(body, '/company', 'PUT');
        }
    }, {
        key: 'findCompany',
        value: function findCompany(companyId) {
            return this.client.makeRequetSimple({}, '/company/' + encodeURIComponent(companyId), 'GET');
        }
    }, {
        key: 'memberCountByEMailAddress',
        value: function memberCountByEMailAddress(mailaddress) {
            return this.client.makeRequetSimple({
                mailaddress: mailaddress
            }, '/company/numberOfUsers', 'PUT');
        }
    }, {
        key: 'test',
        value: function test() {
            return this.client.makeRequetSimple({}, '/company', 'GET');
        }
    }]);

    return CompanyService;
}();

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