import {APIClient, APIMapping} from '../http';
import {AxiosResponse} from 'axios';

export class CustomerLegitimationArchiveService extends APIClient {

	constructor() {
		super(APIMapping.customerLegitimationArchiveService);
	}

	findByType(type: string): Promise<AxiosResponse> {
		return this.invokeApi(`/public/master/legitimation/type/${type}`, 'GET');
	}
}

export default new CustomerLegitimationArchiveService();