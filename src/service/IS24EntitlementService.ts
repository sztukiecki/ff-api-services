import { APIClient, APIMapping } from '../http';
import { AxiosResponse } from 'axios';

export class IS24EntitlementService extends APIClient {

    constructor() {
        super(APIMapping.is24EntitlementService);
    }

    /**
     * This method takes a temporary token created in the IS24 sso authentication flow and return cognito tokens.
     * @param temporaryToken
     */
    async authenticate(temporaryToken: string): Promise<AxiosResponse> {
        return await this.invokeApi('/public/authentication/cognito', 'GET', undefined, {
            queryParams: {
                is24Token: temporaryToken
            }
        });
    }

}

export default new IS24EntitlementService();
