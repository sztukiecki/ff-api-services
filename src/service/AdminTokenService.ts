import { APIClient, APIMapping } from '../http';
import { AxiosResponse } from 'axios';

interface CreateAPIUserResponse {
    userId: string;
    token: string;
}

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
     * This method creates a new api user. A normal user with type API will be created and a valid token will be safed for this
     * created user.
     * This ressource returns a userId and the token.
     */
    async createAPIUser(): Promise<AxiosResponse<CreateAPIUserResponse>> {
        return this.invokeApi('/admin-token', 'POST', undefined, {
            queryParams: {
                userType: 'API',
            },
        });
    }

    /**
     * Fetches a admin token related to a specific user.
     * @param userId
     */
    async fetchAdminToken(userId: string): Promise<AxiosResponse<string>> {
        return this.invokeApi(`/admin-token/${userId}`, 'GET', undefined);
    }

    /**
     * Authenticate the user with the platformToken and returns the cognitoToken
     * @param {string} platformToken
     * @returns {Promise<AxiosResponse>}
     */
    async authenticate(platformToken: string): Promise<AxiosResponse> {
        return this.invokeApi('/public/adminUser/authenticate', 'GET', undefined, {
            headers: {
                token: platformToken,
            },
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
                token: platformToken,
            },
        });
    }
}

export default new AdminTokenService();
