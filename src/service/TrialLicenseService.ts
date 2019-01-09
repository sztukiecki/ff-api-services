import {APIClient, APIMapping} from '../http';

export class TrialLicenseService extends APIClient {

    constructor() {
        super(APIMapping.trialLicenseServive);
    }

    getCustomerDataBySubmissionGuid(submissionGuid: string) {
        return this.invokeApi(`/public/freeTrial/submissionId/${submissionGuid}`, 'GET');
    }

    getCustomerDataByEmail(submissionGuid: string) {
        return this.invokeApi(`/public/freeTrial/email/${submissionGuid}`, 'GET');
    }

    createNewSubscription(payload: any) {
        return this.invokeApi('/public/buy', 'POST', payload);
    }

    upgradeAccount(hostedPageId: string) {
        return this.invokeApi('/upgradeAccount/' + hostedPageId, 'POST');
    }
}

export default new TrialLicenseService();
