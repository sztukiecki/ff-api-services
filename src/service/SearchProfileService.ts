import { AxiosResponse } from 'axios';
import { APIClient, APIMapping } from '../http';

export interface InquiryCreatedMessage {
    inquirySchemaId: string;
    inquiryId: string;
    estateId: string;
    contactId: string;
}

export class SearchProfileService extends APIClient {

    constructor() {
        super(APIMapping.searchProfileService);
    }

    /**
     * TODO: Please comment this method
     */
    async fetchSchema(): Promise<AxiosResponse> {
        return await this.invokeApi(`/searchprofile/schema`, 'GET');
    }

    /**
     * TODO: Please comment this method
     * @param message
     */
    async createSearchprofileFromInquiry(message: InquiryCreatedMessage): Promise<AxiosResponse> {
        return await this.invokeApi(`/searchprofile/fromInquiry`, 'POST', message);
    }
}

export default new SearchProfileService();
