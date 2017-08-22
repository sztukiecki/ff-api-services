"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("../http");
var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.createUser = function (companyID, mailAddress, firstName, lastName) {
        return this.client.makeRequestSimple({
            firstname: firstName,
            lastname: lastName,
            businessMailAddress: mailAddress,
            companyId: companyID
        }, '/users', 'POST');
    };
    UserService.getCurrentUser = function () {
        return this.client.makeRequestSimple({}, '/users/currentUser', 'GET');
    };
    UserService.postImage = function (image) {
        var formData = new FormData();
        formData.append('contactPicture', image, 'contactPicture');
        return this.client.makeRequest('/users/picture', 'POST', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    };
    UserService.updateUser = function (user) {
        return this.client.makeRequest('/users', 'PUT', user);
    };
    UserService.client = new http_1.default(http_1.APIMapping.userService);
    return UserService;
}());
exports.default = UserService;
var StatusMapping = {
    create: {
        CREATED: 201,
        ALREADY_EXISTS: 400,
        MANDANTORY_FIELD_NOT_FILLED: 422,
        INTERNAL_SERVER_ERROR: 500
    },
    current: {
        NOT_FOUND: 404,
        INTERNAL_SERVER_ERROR: 500
    }
};
exports.StatusMapping = StatusMapping;
//# sourceMappingURL=UserService.js.map