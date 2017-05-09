import HttpClient, {APIMapping} from 'http';


export default class UserService {

    constructor() {
        this.client = new HttpClient(APIMapping.userService);
    }

    createUser(companyID, mailAddress, firstName, lastName) {
        return this.client.makeRequetSimple({
            firstname: firstName,
            lastname: lastName,
            businessMailAddress: mailAddress,
            companyId: companyID
        }, '/users', 'POST');
    }

    getCurrentUser() {
        return this.client.makeRequetSimple({}, '/users/currentUser', 'GET');
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