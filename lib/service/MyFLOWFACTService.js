"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("../http");
var MyFLOWFACTService = (function () {
    function MyFLOWFACTService() {
    }
    /**
     * Create a new order for a customer.
     * @param order
     * @returns {*}
     */
    MyFLOWFACTService.doOrder = function (order) {
        return MyFLOWFACTService.client.makeRequestSimple(order, '/order/doOrder', 'POST');
    };
    /**
     * Get the price for a product.
     * @param productName
     * @returns {*}
     */
    MyFLOWFACTService.getProductPrice = function (productName) {
        return MyFLOWFACTService.client.makeRequestSimple({}, "/product/price/" + productName, 'GET');
    };
    MyFLOWFACTService.client = new http_1.default(http_1.APIMapping.myFLOWFACTService);
    return MyFLOWFACTService;
}());
exports.default = MyFLOWFACTService;
//# sourceMappingURL=MyFLOWFACTService.js.map