import {APIClient, APIMapping} from '../http';
import { AxiosResponse } from 'axios';

export class MyFLOWFACTService extends APIClient {

    constructor() {
        super(APIMapping.myFLOWFACTService);
    }

    /**
     * Create a new order for a customer.
     * @param order
     * @returns {*}
     */
    doOrder(order: any): Promise<AxiosResponse> {
        return this.invokeApi('/order/doOrder', 'POST', order);
    }

    /**
     * Get the price for a product.
     * @param productName
     * @returns {*}
     */
    getProductPrice(productName: string) {
        return this.invokeApi(`/product/price/${productName}`, 'GET');
    }

}

export default new MyFLOWFACTService();
