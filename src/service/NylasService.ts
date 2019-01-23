import APIClient from '../http/APIClient';
import APIMapping from '../http/APIMapping';
import { AxiosResponse } from 'axios';

export class NylasService extends APIClient {

	constructor() {
		super(APIMapping.nylasService);
	}

	async authorizeUser(code: string): Promise<AxiosResponse> {
		return await this.invokeApi('/authorize', 'POST', undefined, {
			queryParams: {
				code: code
			}
		});
	}

}

export default new NylasService();
