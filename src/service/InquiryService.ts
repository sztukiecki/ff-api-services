import { AxiosResponse } from 'axios';
import { Inquiry } from '../util/MatchmakingModels';
import APIClient from '../http/APIClient';
import APIMapping from '../http/APIMapping';

export class InquiryService extends APIClient {

	constructor() {
		super(APIMapping.inquiryService);
	}

	getAll(page: number = 1, size: number = 100): Promise<AxiosResponse<Inquiry>> {
		return this.invokeApi(`/inquiry?page=${page}&size=${size}`, 'GET');
	}
}

export default new InquiryService();