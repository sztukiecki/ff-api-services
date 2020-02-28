import { User, UserRole, UserType } from '@flowfact/types';
import { AxiosResponse } from 'axios';
import { APIClient, APIMapping } from './http';

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
     * Fetches all users of the company.
     * Use the userTypes array parameter to filter users by their type
     */
    async fetchAllUsersOfTheCompany(userTypes: UserType[] = []): Promise<AxiosResponse<User[]>> {
        return await this.invokeApi('/users', 'GET', undefined, {
            queryParams: {
                userType: userTypes.join(',')
            }
        });
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
     * @param useV2
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
     * @param useV2
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
     * Returns the identifier (Cognito user name) for a login (can be a preferred user name, an email, or an alias).
     * For aliases the user name cannot be determined with absolute certainty and hence in the returned object
     * the [identifiersOfMatchingAliases]-field lists the matching identifiers.
     * Otherwise the [identifier]-field holds the identifier in the returned object.
     * @param loginName
     */
    async identifyUser(loginName: string): Promise<AxiosResponse<any>> {
        return await this.invokeApi(`/public/cognito-users/usernames/`, 'GET', undefined, {
            queryParams: {
                name: loginName,
            },
        });
    }

    async hasSsoOfType(businessMailAddress: string, ssoType: string): Promise<AxiosResponse<boolean>> {
        return await this.invokeApi('/public/users/sso', 'GET', undefined, {
            queryParams: {
                aliasMailAddress: businessMailAddress,
                ssoType: ssoType
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
     * @param useV2
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

    /**
     * Updated the loginName of a user
     * @param userId
     * @param loginName
     */
    async updateLoginName(userId: string, loginName: string): Promise<AxiosResponse> {
        return await this.invokeApi(`/users/${userId}/loginname`, 'PUT', {
            desiredLoginName: loginName
        });
    }

    /**
     * Resets the password of a selected user. A mail will be sent to the contact email
     * @param userId main identifier of the user
     */
    async resetPassword(userId: string) {
        return await this.invokeApi(`/users/${userId}/password`, 'DELETE');
    }

    /**
     * Checks if a mail is blocked by congito
     * 200 = when the mail address is blocked
     * 404 = when the mail address is not blocked
     * @param mailAddress
     */
    async isMailBlocked(mailAddress: string) {
        return await this.invokeApi(`/public/cognito/mailing/blocks/${mailAddress}`, 'GET');
    }

    /**
     * This resource is used to add the aliasMailAddress of a user to the email user-attribute of the given cognito-user.
     * Additional it will store the cognito-username add the user
     * @param aliasMailAddress
     */
    async link(aliasMailAddress: string) {
        return this.invokeApi(`/public/cognito-users/link`, 'POST', undefined, {
            queryParams: {
                aliasMailAddress: aliasMailAddress
            }
        });
    }

    /**
     * Deletes a user and the associated cognito user.
     * @param userId
     */
    async deleteUser(userId: string) {
        return this.invokeApi(`/users/${userId}`, 'DELETE');
    }
}

export default new UserService();
