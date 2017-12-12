import {APIClient, APIMapping} from '../http';
import { AxiosResponse } from "axios";

export class AdminTokenService extends APIClient {
    constructor() {
        super(APIMapping.adminTokenService);
    }

    getAuthenticationToken(user_platform_token: string): Promise<AxiosResponse>  {
        return this.invokeApi('/public/adminUser/authenticate', 'GET', {headers: {header: user_platform_token}});
    }
}

export default new AdminTokenService();