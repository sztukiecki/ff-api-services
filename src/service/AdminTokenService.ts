import {APIClient, APIMapping} from '../http';
import { AxiosResponse } from "axios";

export class AdminTokenService extends APIClient {
    constructor() {
        super(APIMapping.adminTokenService);
    }

    getAuthenticationToken(userPlatformToken: string): Promise<AxiosResponse>  {
        return this.invokeApi('/public/adminUser/authenticate', 'GET', {headers: {token: userPlatformToken}});
    }
}

export default new AdminTokenService();