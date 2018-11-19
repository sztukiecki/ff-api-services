import { InquiryCreatedMessage } from './../util/searchprofile-service/InquiryCreatedMessage';
import {AxiosResponse} from 'axios';
import {APIClient, APIMapping} from '../http';

export class SearchProfileService extends APIClient {

    constructor() {
        super(APIMapping.searchProfileService);
    }

    getSchema(): Promise<AxiosResponse> {
        return this.invokeApi(`/searchprofile/schema`, 'GET');
    }

    createSearchprofileFromInquiry(message: InquiryCreatedMessage): Promise<AxiosResponse> {
        return this.invokeApi(`/searchprofile/fromInquiry`, 'POST', message);
    }
}

export default new SearchProfileService();
