import { AxiosResponse } from 'axios';
import { APIClient, APIMapping } from '../http';
import { Inquiry } from '../util/MatchmakingModels';

export class InquiryService extends APIClient {

    constructor() {
        super(APIMapping.inquiryService);
    }

    getAll(page: number = 1, size: number = 100): Promise<AxiosResponse<Array<Inquiry>>> {
        return this.invokeApi(`/inquiry?page=${page}&size=${size}`, 'GET');
    }

}

export default new InquiryService();