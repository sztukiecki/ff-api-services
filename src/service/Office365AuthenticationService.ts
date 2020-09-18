import { APIClient, APIMapping } from '../http';
import { AxiosResponse } from 'axios';

export class Office365AuthenticationService extends APIClient {
    constructor() {
        super(APIMapping.office365AuthenticationService);
    }

    /**
     * TODO: Please comment this method
     * @param temporaryToken
     */
    async authenticate(temporaryToken: string): Promise<AxiosResponse> {
        return await this.invokeApi('/public/authentication/cognito', 'GET', undefined, {
            queryParams: {
                temporaryToken: temporaryToken,
            },
        });
    }

    /**
     * TODO: Please comment this method
     * @param code
     * @param redirectUrl
     * @param clientId
     */
    async registerContract(code: string, redirectUrl: string, clientId: string): Promise<AxiosResponse> {
        return await this.invokeApi('/public/authentication/salesautomat', 'GET', undefined, {
            queryParams: {
                code,
                redirectUrl,
                clientId,
                origin: 'client',
            },
        });
    }
}

export default new Office365AuthenticationService();
