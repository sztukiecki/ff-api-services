import { User, UserRole } from './UserService.Types';
import { APIClient, APIMapping } from '../../http';

export class UsersV2Controller extends APIClient {
    constructor() {
        super(APIMapping.userService, '2'); // set api version header
    }

    /**
     * Creates a user and adds it to either an existing company using the same domain, a new company during registration or the company of the current user.
     * @param companyID
     * @param mailAddress
     * @param firstName
     * @param lastName
     */
    async createUser(companyID: string, mailAddress: string, firstName: string, lastName: string) {
        return await this.invokeApiWithErrorHandling<User>('/users', 'POST', {
            firstname: firstName,
            lastname: lastName,
            businessMailAddress: mailAddress,
            companyId: companyID,
        });
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
     * Update a user from the same company
     * @param userId
     * @param user
     */
    async updateUserById(userId: string, user: User) {
        return await this.invokeApiWithErrorHandling<User>(`/users/${userId}`, 'PUT', user);
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
     * returns the currently logged in user
     */
    async fetchCurrentUser() {
        return await this.invokeApiWithErrorHandling<User>('/users/currentUser', 'GET');
    }
}
