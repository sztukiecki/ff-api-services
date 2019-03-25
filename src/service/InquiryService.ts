import { AxiosResponse } from 'axios';
import { APIClient, APIMapping } from '../http';
import { Inquiry } from '../models/MatchmakingModels';

export class InquiryService extends APIClient {

    constructor() {
        super(APIMapping.inquiryService);
    }

    /**
     * Fetches all inquiries with pagination support
     * @param {number} page - Number of times the result will be offset by given size.
     * @param {number} size - Number of entities to fetch.
     */
    async fetchAll(page: number = 1, size: number = 100): Promise<AxiosResponse<Array<Inquiry>>> {
        return await this.invokeApi(`/inquiry?page=${page}&size=${size}`, 'GET');
    }

    /**
     * Use this method to link an estate with given ID to an inquiry with given ID, that has no estate linked yet.
     * @param {string} inquiryId - ID of the inquiry that will be updated.
     * @param {string} estateId - ID of the estate that will be linked to the inquiry.
     * @returns the updated inquiry
     */
    async linkEstateAndStartAutomation(inquiryId: string, estateId: string): Promise<AxiosResponse<Inquiry>> {
        return await this.invokeApi(`/inquiry/${inquiryId}/setEstate/${estateId}`, 'POST');
    }

}

export default new InquiryService();