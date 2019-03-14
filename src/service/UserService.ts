import { APIClient, APIMapping } from '../http';
import { AxiosResponse } from 'axios';
import { User } from '../util/user-service/user';
import { CreateUserModel } from '../util/user-service/createUserModel';

export class UserService extends APIClient {

    constructor() {
        super(APIMapping.userService);
    }

    createUser(companyID: string, mailAddress: string, firstName: string, lastName: string): Promise<AxiosResponse<CreateUserModel>> {
        return this.invokeApi('/users', 'POST', {
            firstname: firstName,
            lastname: lastName,
            businessMailAddress: mailAddress,
            companyId: companyID
        });
    }

    getCurrentUser(): Promise<AxiosResponse<User>> {
        return this.invokeApi('/users/currentUser', 'GET');
    }

    getAllUsersOfTheCompany(): Promise<AxiosResponse<User[]>> {
        return this.invokeApi('/users', 'GET');
    }

    postImage(image: Blob): Promise<AxiosResponse<any>> {
        const formData = new FormData();
        formData.append('contactPicture', image, 'contactPicture');
        return this.invokeApi('/users/picture', 'POST', formData, {headers: {'Content-Type': 'multipart/form-data'}});
    }

    postImageForUser(userId: string, image: Blob): Promise<AxiosResponse<any>> {
        const formData = new FormData();
        formData.append('contactPicture', image, 'contactPicture');
        return this.invokeApi(`/users/${userId}/picture`, 'POST', formData, {headers: {'Content-Type': 'multipart/form-data'}});
    }

    updateUser(user: User): Promise<AxiosResponse<any>> {
        return this.invokeApi('/users', 'PUT', user);
    }

    updateUserById(userId: string, user: User): Promise<AxiosResponse<any>> {
        return this.invokeApi(`/users/${userId}`, 'PUT', user);
    }

    isUserAlreadyKnown(aliasMailAddress: string): Promise<AxiosResponse<any>> {
        return this.invokeApi('/public/users/exists', 'GET', undefined, {
            queryParams: {
                aliasMailAddress: aliasMailAddress
            }
        });
    }

    getUserByAliasMailAddressInternal(aliasMailAddress: string): Promise<AxiosResponse<any>> {
        return this.invokeApi('/internal/users', 'GET', undefined, {
            queryParams: {
                aliasMailAddress: aliasMailAddress
            }
        });
    }

    getUserByLoginInternal(loginMailAddress: string): Promise<AxiosResponse<any>> {
        return this.invokeApi('/internal/users', 'GET', undefined, {
            queryParams: {
                login: loginMailAddress
            }
        });
    }

    activateUser(userId: string) {
        return this.invokeApi(
            `/users/${userId}`,
            'PATCH',
            [{
                op: 'activate'
            }],
            {
                headers: {
                    'Content-Type': 'application/json-patch+json'
                }
            }
        );
    }

    deactivateUser(userId: string) {
        return this.invokeApi(
            `/users/${userId}`,
            'PATCH',
            [{
                op: 'deactivate'
            }],
            {
                headers: {
                    'Content-Type': 'application/json-patch+json'
                }
            }
        );
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
