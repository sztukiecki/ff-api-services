import {APIClient, APIMapping} from '../http';

export class TrialLicenseService extends APIClient {

    constructor() {
        super(APIMapping.trialLicenseServive);
    }


    getCustomerDataBySubmissionGuid(submissionGuid: string) {
        return this.invokeApi(`/public/freeTrial/submissionId/${submissionGuid}`, 'GET').then(s => s.data);
    }

    getCustomerDataByEmail(submissionGuid: string) {
        return this.invokeApi(`/public/freeTrial/email/${submissionGuid}`, 'GET').then(s => s.data);
    }

    createNewSubscription(payload: any) {
        return this.invokeApi('/public/buy', 'POST', payload).then(s => s.data);
    }

    upgradeAccount() {
        return this.invokeApi('/upgradeAccount', 'POST').then(s => s.data);
    }
}

export default new TrialLicenseService();
