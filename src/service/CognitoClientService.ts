import { APIClient, APIMapping } from '../http';
import { AxiosResponse } from 'axios';

export class CognitoClientService extends APIClient {

    constructor() {
        super(APIMapping.cognitoClientService);
    }

    fetchLoginNameByAliasMailAddress(aliasMailAddress: string): Promise<AxiosResponse> {
        return this.invokeApi(`/public/users/loginname/`, 'GET', undefined, {
            queryParams: {
                aliasMailAddress: aliasMailAddress
            }
        });
    }

    linkAccount(aliasMailAddress: string): Promise<AxiosResponse> {
        return this.invokeApi(`/public/users/link`, 'POST', undefined, {
            queryParams: {
                aliasMailAddress: aliasMailAddress
            }
        });
    }

    resetPassword(aliasMailAddress: string): Promise<AxiosResponse> {
        return this.invokeApi(`/users/password`, 'DELETE', {username: aliasMailAddress});
    }
}

export default new CognitoClientService();
