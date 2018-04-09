import {APIClient, APIMapping} from '../http';
import { AxiosResponse } from 'axios';

export class UserService extends APIClient {

    constructor() {
        super(APIMapping.userService);
    }

    createUser(companyID: string, mailAddress: string, firstName: string, lastName: string): Promise<AxiosResponse> {
        return this.invokeApi('/users', 'POST', {
            firstname: firstName,
            lastname: lastName,
            businessMailAddress: mailAddress,
            companyId: companyID
        });
    }

    getCurrentUser() {
        return this.invokeApi('/users/currentUser', 'GET');
    }

    getAllUsersOfTheCompany() {
        return this.invokeApi('/users', 'GET');
    }

    postImage(image: any) {
        const formData = new FormData();
        formData.append('contactPicture', image, 'contactPicture');
        return this.invokeApi('/users/picture', 'POST', formData, {headers: {'Content-Type': 'multipart/form-data'}});
    }

    updateUser(user: any) {
        return this.invokeApi('/users', 'PUT', user);
    }
}

export default new UserService();

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
