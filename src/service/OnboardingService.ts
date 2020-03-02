import { CreateNewSubscriptionResponse, ZohoAddon, ZohoPlan } from '@flowfact/types';
import { AxiosResponse } from 'axios';
import { APIClient, APIMapping } from '../http';

export class OnboardingService extends APIClient {
    constructor() {
        super(APIMapping.onboardingService);
    }

    /**
     * Onboards the current user and triggers all the necessary steps
     * @returns {Promise<AxiosResponse>}
     */
    async onboardCurrentUser(): Promise<AxiosResponse> {
        return this.invokeApi('/customer', 'POST');
    }

    /**
     * TODO: Please comment this method
     * @param bundleName
     * @param withEntities
     */
    async setupAccount(bundleName: string, withEntities: boolean = true): Promise<AxiosResponse> {
        const queryParams: any = {
            bundleName: bundleName,
            withEntities: withEntities.toString(),
        };

        return this.invokeApi('/customer/setup', 'POST', undefined, { queryParams });
    }

    /**
     * Generates a Zoho hosted page for checkout
     * @param numberOfUsers
     */
    async createNewSubscription(numberOfUsers: string): Promise<AxiosResponse<CreateNewSubscriptionResponse>> {
        const queryParams: any = {
            numberOfUsers: numberOfUsers,
        };
        return this.invokeApi('/buypage/generateUrl', 'POST', undefined, { queryParams });
    }

    /**
     * Fetch the default zoho plan, to get current information on pricing
     */
    async fetchSubscriptionPlan(): Promise<AxiosResponse<ZohoPlan>> {
        return this.invokeApi('/plan', 'GET');
    }

    /**
     * Fetch the default zoho additional user addon
     */
    async fetchAddon(): Promise<AxiosResponse<ZohoAddon>> {
        return this.invokeApi('/addon', 'GET');
    }

    /**
     * TODO: Please comment this method
     */
    async fetchQualificationQuestions(): Promise<AxiosResponse<any>> {
        return this.invokeApi('/qualifications', 'GET');
    }

    /**
     * TODO: Please comment this method
     * @param questionId
     * @param answer
     */
    async answerQuestion(questionId: number, answer: any): Promise<AxiosResponse> {
        return this.invokeApi('/qualifications/answer/' + questionId, 'POST', { answer });
    }

    /**
     * Tells backend, that the "Buy Now" button was clicked.
     */
    async trackBuyNowClicked(): Promise<AxiosResponse> {
        return this.invokeApi('/track/buynowclicked', 'POST');
    }

    /**
     * Tells backend, that the terms where confirmed. (For example: After click onto the "order now" button)
     */
    async trackTermsConfirmed(): Promise<AxiosResponse> {
        return this.invokeApi('/track/termsconfirmed', 'POST');
    }
}

export default new OnboardingService();
