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
}

export default new TrialLicenseService();
