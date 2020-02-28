import { APIClient, APIMapping } from './http';
import { AxiosResponse } from 'axios';

export class CognitoClientService extends APIClient {

    constructor() {
        super(APIMapping.cognitoClientService);
    }

    /**
     * TODO: Please comment this method
     * @param aliasMailAddress
     * @deprecated Moved to UserService
     */
    async fetchLoginNameByAliasMailAddress(aliasMailAddress: string): Promise<AxiosResponse> {
        return this.invokeApi(`/public/users/loginname/`, 'GET', undefined, {
            queryParams: {
                aliasMailAddress: aliasMailAddress
            }
        });
    }

    /**
     * TODO: Please comment this method
     * @param aliasMailAddress
     */
    async linkAccount(aliasMailAddress: string): Promise<AxiosResponse> {
        return this.invokeApi(`/public/users/link`, 'POST', undefined, {
            queryParams: {
                aliasMailAddress: aliasMailAddress
            }
        });
    }

    /**
     * This method resets the password of a specific user
     * @param aliasMailAddress
     * @param businessMailAddress
     */
    async resetPassword(aliasMailAddress: string, businessMailAddress: string): Promise<AxiosResponse> {
        return this.invokeApi(`/users/password`, 'POST', {
            aliasMailAddress: aliasMailAddress,
            businessMailAddress: businessMailAddress
        });
    }

    /**
     * check if the specific mail address is blocked, return 200 when the email is blocked, otherwise 404
     * @param mailAddress mail address to check
     */
    isMailBlocked = (mailAddress: string) => {
        return this.invokeApi(`/public/mailing/blocks/${mailAddress}`, 'GET');
    };

}

export default new CognitoClientService();
