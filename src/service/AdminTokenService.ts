import { APIClient, APIMapping } from '../http';
import { AxiosResponse } from 'axios';

export class AdminTokenService extends APIClient {
    constructor() {
        super(APIMapping.adminTokenService);
    }

    /**
     * TODO: Please comment this method
     */
    async createOrReturnAdminToken(): Promise<AxiosResponse> {
        return this.invokeApi('/createOrReturnAdminToken', 'POST');
    }

    /**
     * Authenticate the user with the platformToken and returns the cognitoToken
     * @param {string} platformToken
     * @returns {Promise<AxiosResponse>}
     */
    async authenticate(platformToken: string): Promise<AxiosResponse> {
        return this.invokeApi('/public/adminUser/authenticate', 'GET', undefined, {
            headers: {
                token: platformToken
            }
        });
    }

    /**
     * Authenticate the user with the platformToken and returns the cognitoToken + username
     * @param {string} platformToken
     * @returns {Promise<AxiosResponse>}
     */
    async authenticateAndReturnUsernameWithToken(platformToken: string): Promise<AxiosResponse> {
        return this.invokeApi('/public/adminUser/authenticateAndReturnUsernameWithToken', 'GET', undefined, {
            headers: {
                token: platformToken
            }
        });
    }
}

export default new AdminTokenService();