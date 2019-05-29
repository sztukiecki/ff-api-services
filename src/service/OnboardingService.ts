import { APIClient, APIMapping } from '../http';
import { AxiosResponse } from 'axios';

interface ZohoPlan {
    planCode: string;
    name: string;
    description: string;
    setupFee: number;
    recurringPrice: number;
    interval: number;
    unit: string;
    storeMarkupDescription: string;
    status: string;
    productId: string;
    accountId: string;
    accountName: string;
    trialPeriod: number;
    setupFeeAccountId: string;
    setupFeeAccountName: string;
    tags: any;
    customFields: any;
    billingCycles: number;
    url: string;
    taxId: string;
    productType: string;
    hsnOrSac: string;
    createdTime: string;
    updatedTime: string;
}

export interface PriceBracket {
    price: number;
}

export interface ZohoAddon {
    name: string;
    addonCode: string;
    description: string;
    status: string;
    unitName: string;
    productId: string;
    taxId: string;
    taxName: string;
    taxPercentage: number;
    taxType: string;
    applicableToAllPlans: boolean;
    productType: string;
    showInWidget: boolean;
    storeDescription: string;
    storeMarkupDescription: string;
    type: string;
    intervalUnit: string;
    createdTime: Date;
    updatedTime: Date;
    pricingScheme: string;
    plans: any[];
    priceBrackets: PriceBracket[];
}

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
     * Fetch the default zoho plan, to get current information on pricing
     */
    async fetchSubscriptionPlan(): Promise<AxiosResponse<ZohoPlan>>  {
        return this.invokeApi('/plan', 'GET');
    }

    /**
     * Fetch the default zoho additional user addon
     */
    async fetchAddon(): Promise<AxiosResponse<ZohoAddon>>  {
        return this.invokeApi('/addon', 'GET');
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
