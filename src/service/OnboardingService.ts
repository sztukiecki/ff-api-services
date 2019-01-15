import {APIClient, APIMapping} from '../http';
import {AxiosResponse} from "axios";

export class AdminTokenService extends APIClient {
    constructor() {
        super(APIMapping.adminTokenService);
    }

    /**
     * Onboards the current user and triggers all the necessary steps
     * @returns {Promise<AxiosResponse>}
     */
    onboardCurrentUser(): Promise<AxiosResponse> {
        return this.invokeApi('/customer', 'POST');
    }
}

export default new AdminTokenService();