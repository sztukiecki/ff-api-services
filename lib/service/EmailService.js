"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("../http");
var EmailService = (function () {
    function EmailService() {
    }
    EmailService.createDomain = function (domain) {
        return EmailService.client.makeRequestSimple({ domain: domain }, '/configuration/whitelabel', 'POST').then(function (_a) {
            var data = _a.data;
            return data;
        });
    };
    EmailService.verifyDomain = function (domain) {
        return EmailService.client.makeRequestSimple({ domain: domain }, '/configuration/whitelabel/verify', 'POST').then(function (_a) {
            var data = _a.data;
            return data;
        });
    };
    EmailService.client = new http_1.default(http_1.APIMapping.emailService);
    return EmailService;
}());
exports.default = EmailService;
//# sourceMappingURL=EmailService.js.map