import {APIClient, APIMapping} from '../http';
import {AxiosResponse} from "axios";

export class OnboardingService extends APIClient {
    constructor() {
        super(APIMapping.onboardingService);
    }

    /**
     * Onboards the current user and triggers all the necessary steps
     * @returns {Promise<AxiosResponse>}
     */
    onboardCurrentUser(): Promise<AxiosResponse> {
        return this.invokeApi('/customer', 'POST');
    }

    setupAccount(bundleName: string): Promise<AxiosResponse> {
        const queryParams: any = {
            bundleName: bundleName
        };

        return this.invokeApi('/customer/setup', 'POST', undefined, {queryParams});
    }

}

export default new OnboardingService();