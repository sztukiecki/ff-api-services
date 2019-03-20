import { APIClient, APIMapping } from '../http';
import { AxiosResponse } from 'axios';

export interface TotalCommission {
    totalCommission: number;
}

export interface CommissionEntry {
    entityId: string;
    commission: number;
}

export class CommissionCalculationService extends APIClient {
    constructor() {
        super(APIMapping.commissionCalculationService);
    }

    /**
     * TODO: Please comment this method
     * @param entityIds
     */
    async calculateTotalCommission(entityIds: string[]): Promise<AxiosResponse<TotalCommission>> {
        return this.invokeApi(`/calculateTotalCommission`, 'POST', entityIds);
    }

    /**
     * TODO: Please comment this method
     * @param entityIds
     */
    async calculateSeparateCommission(entityIds: string[]): Promise<AxiosResponse<CommissionEntry[]>> {
        return this.invokeApi(`/calculateSeparateCommission`, 'POST', entityIds);
    }
}

export default new CommissionCalculationService();
