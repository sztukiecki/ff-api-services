import { APIClient, APIMapping } from '../http';
import { AxiosResponse } from 'axios';

export class SprengnetterService extends APIClient {

    constructor() {
        super(APIMapping.spregnetterService);
    }

    /**
     * TODO: Please comment this method
     * @param body
     */
    async fetchRentHeatmap(body: any): Promise<AxiosResponse> {
        return await this.invokeApi('/api/rent/heatmap', 'POST', body);
    }

    /**
     * TODO: Please comment this method
     * @param body
     */
    async fetchValuationHeatmap(body: any): Promise<AxiosResponse> {
        return await this.invokeApi('/api/valuation/heatmap', 'POST', body);
    }

    /**
     * TODO: Please comment this method
     * @param body
     */
    async fetchValuation(body: any): Promise<AxiosResponse> {
        return await this.invokeApi('/api/valuation', 'POST', body);
    }

    /**
     * TODO: Please comment this method
     * @param body
     */
    async fetchRentValuation(body: any): Promise<AxiosResponse> {
        return await this.invokeApi('/api/rent', 'POST', body);
    }

}

export default new SprengnetterService();
