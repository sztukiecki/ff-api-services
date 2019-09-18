import { User, UserRole } from '@flowfact/types';
import { AxiosResponse } from 'axios';
import { APIClient, APIMapping } from '../http';

const v2Header = {headers: {'x-ff-version': 2}};

export class UserService extends APIClient {

    constructor() {
        super(APIMapping.userService);
    }

    /**
     * Creates a user and adds it to either an existing company using the same domain, a new company during registration or the company of the current user.
     * @param companyID
     * @param mailAddress
     * @param firstName
     * @param lastName
     */
    async createUser(companyID: string, mailAddress: string, firstName: string, lastName: string, useV2: boolean = false): Promise<AxiosResponse<User>> {
        if (useV2) {
            return await this.invokeApi(
                '/users',
                'POST',
                {
                    firstname: firstName,
                    lastname: lastName,
                    businessMailAddress: mailAddress,
                    companyId: companyID,
                },
                v2Header);
        }

        return await this.invokeApi('/users', 'POST', {
            firstname: firstName,
            lastname: lastName,
            businessMailAddress: mailAddress,
            companyId: companyID,
        });
    }

    /**
     * Creates a user based on a user-model object. This is necessary to make the new createUser Ressource work for some cases.
     * @param user - The usermodel that is used to create the user.
     */
    async createUserByModel(user: User) {
        return await this.invokeApi(
            '/users',
            'POST',
            user,
            v2Header
        );
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
     * Update the currently logged in user
     * @param user
     */
    async updateUser(user: User, useV2: boolean = false): Promise<AxiosResponse<any>> {
        if (useV2) {
            return await this.invokeApi('/users', 'PUT', user, v2Header);
        }
        return await this.invokeApi('/users', 'PUT', user);
    }

    /**
     * Update a user from the same company
     * @param userId
     * @param user
     */
    async updateUserById(userId: string, user: User, useV2: boolean = false): Promise<AxiosResponse<any>> {
        if (useV2) {
            return await this.invokeApi(`/users/${userId}`, 'PUT', user, v2Header);
        }
        return await this.invokeApi(`/users/${userId}`, 'PUT', user);
    }

    /**
     * Assignes roles to the user, must be called by an ADMIN user
     * @param userId
     * @param roles
     */
    async assignRoles(userId: string, roles: UserRole[]): Promise<AxiosResponse<any>> {
        return await this.invokeApi(`/users/${userId}/roles`, 'PUT', roles, v2Header);
    }

    /**
     * Checks if any user has the given aliasMailAddress. Will throw an error if more then one user was found.
     * @param aliasMailAddress
     */
    async isUserAlreadyKnown(aliasMailAddress: string): Promise<AxiosResponse<any>> {
        return await this.invokeApi('/public/users/exists', 'GET', undefined, {
            queryParams: {
                aliasMailAddress: aliasMailAddress,
            },
        });
    }

    /**
     * Searchs for users with the given aliasMailAddress and if we found exactly one, then we return his businessMailAddress
     * @param aliasMailAddress
     */
    async resolveAliasMailAddress(aliasMailAddress: string): Promise<AxiosResponse<any>> {
        return await this.invokeApi('/public/users/resolve', 'GET', undefined, {
            queryParams: {
                aliasMailAddress: aliasMailAddress,
            },
        });
    }

    /**
     * TODO: Please comment this method
     * @param aliasMailAddress
     */
    async fetchUserByAliasMailAddressInternal(aliasMailAddress: string): Promise<AxiosResponse<User>> {
        return await this.invokeApi('/internal/users', 'GET', undefined, {
            queryParams: {
                aliasMailAddress: aliasMailAddress,
            },
        });
    }

    /**
     * TODO: Please comment this method
     * @param loginMailAddress
     */
    async fetchUserByLoginInternal(loginMailAddress: string): Promise<AxiosResponse<User>> {
        return await this.invokeApi('/internal/users', 'GET', undefined, {
            queryParams: {
                login: loginMailAddress,
            },
        });
    }

    /**
     * TODO: Please comment this method
     * @param userId
     */
    async activateUser(userId: string, useV2: boolean = false): Promise<AxiosResponse> {
        return await this.invokeApi(
            `/users/${userId}`,
            'PATCH',
            [{
                op: 'activate',
            }],
            {
                headers: {
                    'Content-Type': 'application/json-patch+json',
                    'x-ff-version': useV2 ? 2 : 1,
                },
            },
        );
    }

    /**
     * TODO: Please comment this method
     * @param userId
     */
    async deactivateUser(userId: string, useV2: boolean = false): Promise<AxiosResponse> {
        return await this.invokeApi(
            `/users/${userId}`,
            'PATCH',
            [{op: 'deactivate'}],
            {
                headers: {
                    'Content-Type': 'application/json-patch+json',
                    'x-ff-version': useV2 ? 2 : 1,
                },
            },
        );
    }
}

export default new UserService();

const StatusMapping = {
    create: {
        CREATED: 201,
        ALREADY_EXISTS: 400,
        MANDANTORY_FIELD_NOT_FILLED: 422,
        INTERNAL_SERVER_ERROR: 500,
    },
    current: {
        NOT_FOUND: 404,
        INTERNAL_SERVER_ERROR: 500,
    },
};

export {
    StatusMapping,
};
