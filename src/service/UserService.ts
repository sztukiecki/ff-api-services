import {APIClient, APIMapping} from '../http';
import {AxiosResponse} from 'axios';
import User from '../models/User';

export class UserService extends APIClient {

    constructor() {
        super(APIMapping.userService);
    }

    /**
     * TODO: Please comment this method
     * @param companyID
     * @param mailAddress
     * @param firstName
     * @param lastName
     */
    async createUser(companyID: string, mailAddress: string, firstName: string, lastName: string): Promise<AxiosResponse<User>> {
        return await this.invokeApi('/users', 'POST', {
            firstname: firstName,
            lastname: lastName,
            businessMailAddress: mailAddress,
            companyId: companyID
        });
    }

    /**
     * TODO: Please comment this method
     */
    async fetchCurrentUser(): Promise<AxiosResponse<User>> {
        return await this.invokeApi('/users/currentUser', 'GET');
    }

    /**
     * TODO: Please comment this method
     */
    async fetchAllUsersOfTheCompany(): Promise<AxiosResponse<User[]>> {
        return await this.invokeApi('/users', 'GET');
    }

    /**
     * TODO: Please comment this method
     * @param image
     */
    async postImage(image: Blob): Promise<AxiosResponse<any>> {
        const formData = new FormData();
        formData.append('contactPicture', image, 'contactPicture');
        return this.invokeApi('/users/picture', 'POST', formData, {headers: {'Content-Type': 'multipart/form-data'}});
    }

    /**
     * TODO: Please comment this method
     * @param userId
     * @param image
     */
    async postImageForUser(userId: string, image: Blob): Promise<AxiosResponse<any>> {
        const formData = new FormData();
        formData.append('contactPicture', image, 'contactPicture');
        return this.invokeApi(`/users/${userId}/picture`, 'POST', formData, {headers: {'Content-Type': 'multipart/form-data'}});
    }

    /**
     * TODO: Please comment this method
     * @param user
     */
    async updateUser(user: User): Promise<AxiosResponse<any>> {
        return await this.invokeApi('/users', 'PUT', user);
    }

    /**
     * TODO: Please comment this method
     * @param userId
     * @param user
     */
    async updateUserById(userId: string, user: User): Promise<AxiosResponse<any>> {
        return await this.invokeApi(`/users/${userId}`, 'PUT', user);
    }

    /**
     * TODO: Please comment this method
     * @param aliasMailAddress
     */
    async isUserAlreadyKnown(aliasMailAddress: string): Promise<AxiosResponse<any>> {
        return await this.invokeApi('/public/users/exists', 'GET', undefined, {
            queryParams: {
                aliasMailAddress: aliasMailAddress
            }
        });
    }

    /**
     * TODO: Please comment this method
     * @param aliasMailAddress
     */
    async fetchUserByAliasMailAddressInternal(aliasMailAddress: string): Promise<AxiosResponse<User>> {
        return await this.invokeApi('/internal/users', 'GET', undefined, {
            queryParams: {
                aliasMailAddress: aliasMailAddress
            }
        });
    }

    /**
     * TODO: Please comment this method
     * @param loginMailAddress
     */
    async fetchUserByLoginInternal(loginMailAddress: string): Promise<AxiosResponse<User>> {
        return await this.invokeApi('/internal/users', 'GET', undefined, {
            queryParams: {
                login: loginMailAddress
            }
        });
    }

    /**
     * TODO: Please comment this method
     * @param userId
     */
    async activateUser(userId: string): Promise<AxiosResponse> {
        return await this.invokeApi(
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

    /**
     * TODO: Please comment this method
     * @param userId
     */
    async deactivateUser(userId: string): Promise<AxiosResponse> {
        return await this.invokeApi(`/users/${userId}`, 'PATCH', [{op: 'deactivate'}], {
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
