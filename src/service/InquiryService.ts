import { AxiosResponse } from 'axios';
import { APIClient, APIMapping } from '../http';
import { Inquiry } from '../models/MatchmakingModels';

export class InquiryService extends APIClient {

    constructor() {
        super(APIMapping.inquiryService);
    }

    /**
     * TODO: Please comment this method
     * @param page
     * @param size
     */
    async fetchAll(page: number = 1, size: number = 100): Promise<AxiosResponse<Array<Inquiry>>> {
        return await this.invokeApi(`/inquiry?page=${page}&size=${size}`, 'GET');
    }

    /**
     * TODO: Please comment this method
     * @param inquiryId
     * @param estateId
     */
    async linkEstateAndStartAutomation(inquiryId: string, estateId: string): Promise<AxiosResponse> {
        return await this.invokeApi(`/inquiry/${inquiryId}/setEstate/${estateId}`, 'POST');
    }

}

export default new InquiryService();