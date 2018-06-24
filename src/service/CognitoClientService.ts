import {APIClient, APIMapping} from '../http';
import {AxiosResponse} from 'axios';

export class CognitoClientService extends APIClient {

    constructor() {
        super(APIMapping.cognitoClientService);
    }

    getLoginNameByAliasMailAddress(aliasMailAddress: string): Promise<AxiosResponse> {
        return this.invokeApi(`/public/users/loginname/`, 'GET', undefined, {queryParams: {aliasMailAddress: aliasMailAddress}}).then(response => response.data);
    }

}

export default new CognitoClientService();
