import { User } from '@flowfact/types';
import { APIClient, APIMapping } from '../../../http';

export class UsersController extends APIClient {
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
}
