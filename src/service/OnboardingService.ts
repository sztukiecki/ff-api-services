import { APIClient, APIMapping } from '../http';
import { AxiosResponse } from 'axios';

export class OnboardingService extends APIClient {
    constructor() {
        super(APIMapping.onboardingService);
    }

    /**
     * Onboards the current user and triggers all the necessary steps
     * @returns {Promise<AxiosResponse>}
     */
    async onboardCurrentUser(): Promise<AxiosResponse> {
        return await this.invokeApi('/customer', 'POST');
    }

    /**
     * TODO: Please comment this method
     * @param bundleName
     * @param withEntities
     */
    async setupAccount(bundleName: string, withEntities: boolean = true): Promise<AxiosResponse> {
        const queryParams: any = {
            bundleName: bundleName,
            withEntities: withEntities.toString()
        };

        return await this.invokeApi('/customer/setup', 'POST', undefined, {queryParams});
    }

    /**
     * TODO: Please comment this method
     * @param numberOfUsers
     */
    async createNewSubscription(numberOfUsers: string) {
        const queryParams: any = {
            numberOfUsers: numberOfUsers
        };
        return await this.invokeApi('/buypage/generateUrl', 'POST', undefined, {queryParams});
    }

    /**
     * TODO: Please comment this method
     */
    async fetchQualificationQuestions() {
        return this.invokeApi('/qualifications', 'GET');
    }

    /**
     * TODO: Please comment this method
     * @param questionId
     * @param answer
     */
    async answerQuestion(questionId: number, answer: any) {
        return await this.invokeApi('/qualifications/answer/' + questionId, 'POST', {answer});
    }

    /**
     * Tells backend, that the "Buy Now" button was clicked.
     */
    async trackBuyNowClicked() {
        return await this.invokeApi('/track/buynowclicked', 'POST');
    }

    /**
     * Tells backend, that the terms where confirmed. (For example: After click onto the "order now" button)
     */
    async trackTermsConfirmed() {
        return await this.invokeApi('/track/termsconfirmed', 'POST')
    }
}

export default new OnboardingService();