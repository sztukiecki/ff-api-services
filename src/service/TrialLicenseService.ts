import { APIClient, APIMapping } from '../http';

export class TrialLicenseService extends APIClient {

    constructor() {
        super(APIMapping.trialLicenseServive);
    }

    /**
     * TODO: Please comment this method
     * @param submissionGuid
     */
    async fetchCustomerDataBySubmissionGuid(submissionGuid: string) {
        return await this.invokeApi(`/public/freeTrial/submissionId/${submissionGuid}`, 'GET');
    }

    /**
     * TODO: Please comment this method
     * @param submissionGuid
     */
    async fetchCustomerDataByEmail(submissionGuid: string) {
        return await this.invokeApi(`/public/freeTrial/email/${submissionGuid}`, 'GET');
    }

    /**
     * TODO: Please comment this method
     * @param payload
     */
    async createNewSubscription(payload: any) {
        return await this.invokeApi('/public/buy', 'POST', payload);
    }

    /**
     * TODO: Please comment this method
     * @param hostedPageId
     */
    async upgradeAccount(hostedPageId: string) {
        return await this.invokeApi('/upgradeAccount/' + hostedPageId, 'POST');
    }
}

export default new TrialLicenseService();
