import { APIClient, APIMapping } from '../http';
import { AxiosResponse } from 'axios';
import { EnvironmentManagementInstance } from '../util/EnvironmentManagement';

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
                is24Token: temporaryToken,
            },
        });
    }

    get authenticationRedirectURL() {
        return `${EnvironmentManagementInstance.getBaseUrl()}/is24-entitlement-service/public/authenticate`;
    }
}

export default new IS24EntitlementService();
