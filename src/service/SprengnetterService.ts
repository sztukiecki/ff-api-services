import {APIClient, APIMapping} from '../http';
import {AxiosResponse} from "axios";

export class SprengnetterService extends APIClient {

    constructor() {
        super(APIMapping.spregnetterService);
    }

    fetchRentHeatmap(body: any): Promise<AxiosResponse> {
        return this.invokeApi('/api/rent/heatmap', 'POST', body);
    }

    fetchValuationHeatmap(body: any): Promise<AxiosResponse> {
        return this.invokeApi('/api/valuation/heatmap', 'POST', body);
    }

    fetchValuation(body: any): Promise<AxiosResponse> {
        return this.invokeApi('/api/valuation', 'POST', body);
    }
}

export default new SprengnetterService();
