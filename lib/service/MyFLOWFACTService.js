var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import HttpClient, { APIMapping } from '../http';

var MyFLOWFACTService = (_temp = _class = function () {
    function MyFLOWFACTService() {
        _classCallCheck(this, MyFLOWFACTService);
    }

    _createClass(MyFLOWFACTService, null, [{
        key: 'doOrder',


        /**
         * Create a new order for a customer.
         * @param order
         * @returns {*}
         */
        value: function doOrder(order) {
            return MyFLOWFACTService.client.makeRequestSimple(order, '/order/doOrder', 'POST');
        }

        /**
         * Get the price for a product.
         * @param productName
         * @returns {*}
         */

    }, {
        key: 'getProductPrice',
        value: function getProductPrice(productName) {
            return MyFLOWFACTService.client.makeRequestSimple(order, '/product/price/' + productName, 'GET');
        }
    }]);

    return MyFLOWFACTService;
}(), _class.client = new HttpClient(APIMapping.myFLOWFACTService), _temp);
export { MyFLOWFACTService as default };