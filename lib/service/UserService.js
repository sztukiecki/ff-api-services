var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import HttpClient, { APIMapping } from '../http';

var UserService = (_temp = _class = function () {
    function UserService() {
        _classCallCheck(this, UserService);
    }

    _createClass(UserService, null, [{
        key: 'createUser',
        value: function createUser(companyID, mailAddress, firstName, lastName) {
            return this.client.makeRequestSimple({
                firstname: firstName,
                lastname: lastName,
                businessMailAddress: mailAddress,
                companyId: companyID
            }, '/users', 'POST');
        }
    }, {
        key: 'getCurrentUser',
        value: function getCurrentUser() {
            return this.client.makeRequestSimple({}, '/users/currentUser', 'GET');
        }
    }, {
        key: 'postImage',
        value: function postImage(image) {
            var formData = new FormData();
            formData.append('contactPicture', image, 'contactPicture');
            return this.client.makeRequest({}, '/users/picture', 'POST', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        }
    }, {
        key: 'updateUser',
        value: function updateUser(user) {
            return this.client.makeRequest({}, '/users', 'PUT', user);
        }
    }]);

    return UserService;
}(), _class.client = new HttpClient(APIMapping.userService), _temp);
export { UserService as default };


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

export { StatusMapping };