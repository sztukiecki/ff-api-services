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

	updateInquiries(inquiries: Array<Inquiry>): Promise<AxiosResponse> {
		return this.invokeApi(`/inquiry`, 'PATCH', inquiries);
	}
}

export default new InquiryService();