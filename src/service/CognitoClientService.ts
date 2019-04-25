import { APIClient, APIMapping } from '../http';
import { AxiosResponse } from 'axios';

export class CognitoClientService extends APIClient {

    constructor() {
        super(APIMapping.cognitoClientService);
    }

    /**
     * TODO: Please comment this method
     * @param aliasMailAddress
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
}

export default new CognitoClientService();
