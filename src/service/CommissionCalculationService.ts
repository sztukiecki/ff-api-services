import {APIClient, APIMapping} from '../http';
import { AxiosResponse } from 'axios';

export class CommissionCalculationService extends APIClient {
	constructor() {
		super(APIMapping.commissionCalculationService);
	}

	calculateTotalCommission(entityIds: Array<string>): Promise<AxiosResponse> {
		return this.invokeApi(`/calculateTotalCommission`, 'POST', entityIds);
	}
}

export default new CommissionCalculationService();