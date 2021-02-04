import { S3File, User, UserRole, UserType } from '@flowfact/types';
import { APIClient, APIMapping } from '../../http';

export class UsersController extends APIClient {
    constructor() {
        super(APIMapping.userService);
    }

    /**
     * returns the currently logged in user
     */
    async fetchCurrentUser() {
        return await this.invokeApiWithErrorHandling<User>('/users/currentUser', 'GET');
    }

    /**
     * Fetches all users of the company of the currently logged in user
     * Use the userTypes array parameter to filter users by their type
     */
    async fetchAllUsersOfCurrentCompany(userTypes: UserType[] = []) {
        return await this.invokeApiWithErrorHandling<User[]>('/users', 'GET', undefined, {
            queryParams: {
                userType: userTypes.join(','),
            },
        });
    }

    /**
     * upload image for the current user
     * @param image
     */
    async postImage(image: Blob) {
        const formData = new FormData();
        formData.append('contactPicture', image, 'contactPicture');
        return await this.invokeApiWithErrorHandling<S3File>('/users/picture', 'POST', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    }

    /**
     * upload image for specific user
     * @param userId
     * @param image
     */
    async postImageForUser(userId: string, image: Blob) {
        const formData = new FormData();
        formData.append('contactPicture', image, 'contactPicture');
        return await this.invokeApiWithErrorHandling<S3File>(`/users/${userId}/picture`, 'POST', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    }

    /**
     * Update the currently logged in user
     * @param user
     */
    async updateUser(user: User) {
        return await this.invokeApiWithErrorHandling<User>('/users', 'PUT', user);
    }

    /**
     * Update a user from the same company
     * @param userId
     * @param user
     */
    async updateUserById(userId: string, user: User) {
        return await this.invokeApiWithErrorHandling<User>(`/users/${userId}`, 'PUT', user);
    }

    /**
     * Assignes roles to the user, must be called by an ADMIN user
     * @param userId
     * @param roles
     */
    async assignRoles(userId: string, roles: UserRole[]) {
        return await this.invokeApiWithErrorHandling<User>(`/users/${userId}/roles`, 'PUT', { roles });
    }

    /**
     * try activate the given user (might fail due to restrictions in entitlement service)
     * @param userId
     */
    async activateUser(userId: string) {
        return await this.invokeApiWithErrorHandling<User>(
            `/users/${userId}`,
            'PATCH',
            [
                {
                    op: 'activate',
                },
            ],
            {
                headers: {
                    'Content-Type': 'application/json-patch+json',
                },
            }
        );
    }

    /**
     * deactivate the given user
     * @param userId
     */
    async deactivateUser(userId: string) {
        return await this.invokeApiWithErrorHandling<User>(`/users/${userId}`, 'PATCH', [{ op: 'deactivate' }], {
            headers: {
                'Content-Type': 'application/json-patch+json',
            },
        });
    }

    /**
     * Updated the loginName of a user
     * @param userId
     * @param loginName
     */
    async updateLoginName(userId: string, loginName: string) {
        return await this.invokeApiWithErrorHandling(`/users/${userId}/loginname`, 'PUT', {
            desiredLoginName: loginName,
        });
    }

    /**
     * Resets the password of a selected user. A mail will be sent to the contact email
     * @param userId main identifier of the user
     */
    async resetPassword(userId: string) {
        return await this.invokeApiWithErrorHandling(`/users/${userId}/password`, 'DELETE');
    }

    /**
     * Deletes a user and the associated cognito user.
     * @param userId
     */
    async deleteUser(userId: string) {
        return await this.invokeApiWithErrorHandling(`/users/${userId}`, 'DELETE');
    }
}
