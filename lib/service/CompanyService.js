"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("../http");
var CompanyService = /** @class */ (function () {
    function CompanyService() {
    }
    //domain -> can also be an email
    CompanyService.createCompany = function (companyName, companyUrl, domain) {
        return CompanyService.client.makeRequestSimple({
            companyName: companyName,
            companyUrl: companyUrl,
            domain: domain
        }, '/company', 'POST');
    };
    CompanyService.usePreset = function (presets) {
        return CompanyService.client.makeRequestSimple({
            presets: presets
        }, '/company/usepreset', 'PUT');
    };
    CompanyService.updateCompany = function (body) {
        console.log('##################');
        console.log(body);
        console.log('##################');
        return CompanyService.client.makeRequestSimple(body, '/company', 'PUT');
    };
    CompanyService.findCompany = function (companyId) {
        return CompanyService.client.makeRequestSimple({}, "/company/" + encodeURIComponent(companyId), 'GET');
    };
    CompanyService.memberCountByEMailAddress = function (mailaddress) {
        return CompanyService.client.makeRequestSimple({
            mailaddress: mailaddress
        }, '/company/numberOfUsers', 'PUT');
    };
    CompanyService.postImage = function (image) {
        var formData = new FormData();
        formData.append('logo', image);
        return this.client.makeRequest('/company/logo', 'POST', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    };
    CompanyService.postTerms = function (terms) {
        var formData = new FormData();
        formData.append('terms-file', terms);
        return this.client.makeRequest('/company/terms/upload', 'POST', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    };
    CompanyService.removeTerms = function () {
        return this.client.makeRequest('/company/terms/remove', 'POST', null, {});
    };
    CompanyService.renameTerms = function (currentName, newName) {
        var formData = new FormData();
        formData.append('current-name', currentName);
        formData.append('new-name', newName);
        return this.client.makeRequest('company/terms/rename', 'POST', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    };
    CompanyService.client = new http_1.default(http_1.APIMapping.companyService);
    return CompanyService;
}());
exports.default = CompanyService;
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
exports.StatusMapping = StatusMapping;
//# sourceMappingURL=CompanyService.js.map