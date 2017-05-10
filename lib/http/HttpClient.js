var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import AWS from 'ff-aws-sdk';
import store from 'store';
import APIClient from './APIClient';

var StoreKeys = {
    EdgeServiceStage: 'HTTPCLIENT.APICLIENT.STAGE',
    ServiceStage: 'HTTPCLIENT.APICLIENT.STAGE.SERVICE.'
};

var defaultStage = 'stable';

var getFromStore = function getFromStore(key, defaultValue) {
    'use strict';

    var fromStore = store.get(key);
    return fromStore ? fromStore : defaultValue;
};

var HttpClient = function () {
    function HttpClient(apiMapping) {
        _classCallCheck(this, HttpClient);

        this.apigClient = undefined;

        if (AWS.Config.credentials.accessKeyId === undefined || apiMapping === undefined || apiMapping.name.trim().length === 0) {
            console.warn('http client has some invalid initial configs');
            debugger;
        }

        var stageToUse = getFromStore(StoreKeys.EdgeServiceStage, undefined);

        if (!stageToUse) {
            stageToUse = getFromStore('' + StoreKeys.ServiceStage + apiMapping.name, defaultStage);
        }

        this.apigClient = new APIClient({
            url: document.location.protocol + '//cloudios-1932238678.eu-central-1.elb.amazonaws.com/edge-service/' + apiMapping.name + '/' + stageToUse
        });
    }

    _createClass(HttpClient, [{
        key: 'makeRequest',
        value: function makeRequest(params, path, method) {
            var body = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
            var additionalParams = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;

            return this.apigClient.invokeApi(params, path, method, additionalParams, body);
        }
    }, {
        key: 'makeRequetSimple',
        value: function makeRequetSimple(body, path, method) {
            return this.apigClient.invokeApi(undefined, path, method, undefined, body);
        }
    }]);

    return HttpClient;
}();

export default HttpClient;
module.exports = exports['default'];