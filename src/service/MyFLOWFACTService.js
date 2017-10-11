import HttpClient, {APIMapping} from '../http';

export default class MyFLOWFACTService {

    static client = new HttpClient(APIMapping.myFLOWFACTService);

    /**
     * Create a new order for a customer.
     * @param order
     * @returns {*}
     */
    static doOrder(order) {
        return MyFLOWFACTService.client.makeRequestSimple(order, '/order/doOrder', 'POST');
    }

    /**
     * Get the price for a product.
     * @param productName
     * @returns {*}
     */
    static getProductPrice(productName) {
        return MyFLOWFACTService.client.makeRequestSimple({}, `/product/price/${productName}`, 'GET');
    }

}
