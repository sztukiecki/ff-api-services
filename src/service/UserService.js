import HttpClient, {APIMapping} from '../http';

export default class UserService {

    static client = new HttpClient(APIMapping.userService);

    static createUser(companyID, mailAddress, firstName, lastName) {
        return this.client.makeRequestSimple({
            firstname: firstName,
            lastname: lastName,
            businessMailAddress: mailAddress,
            companyId: companyID
        }, '/users', 'POST');
    }

    static getCurrentUser() {
        return this.client.makeRequestSimple({}, '/users/currentUser', 'GET');
    }

    static postImage(image) {
        const formData = new FormData();
        formData.append('contactPicture', image, 'contactPicture');
        return this.client.makeRequest({}, '/users/picture', 'POST', formData, {headers: {'Content-Type': 'multipart/form-data'}});
    }
}

const StatusMapping = {
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

export {
    StatusMapping
};