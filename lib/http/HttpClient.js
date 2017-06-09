var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import store from 'store';
import APIClient from './APIClient';

var StoreKeys = {
    EdgeServiceStage: 'HTTPCLIENT.APICLIENT.STAGE'
};

var defaultStage = 'stable';

var getStageFromStore = function getStageFromStore() {
    'use strict';

    var fromStore = store.get(StoreKeys.EdgeServiceStage);
    return fromStore ? fromStore : defaultStage;
};

var setStageInStore = function setStageInStore(stage) {
    'use strict';

    if (stage) {
        store.set(StoreKeys.EdgeServiceStage, stage);
    }
};

var isDefaultStage = function isDefaultStage(stageToUse) {
    'use strict';

    return stageToUse === defaultStage;
};

var HttpClient = function () {
    function HttpClient(apiMapping) {
        var _this = this;

        _classCallCheck(this, HttpClient);

        this.apiClient = undefined;
        this.serviceName = undefined;
        this.stageToUse = undefined;

        this.setAPIURL = function () {
            if (_this.apiClient) {
                _this.apiClient.config.url = 'https://cloudios.development.flowfact.cloud/edge-service/' + _this.serviceName + '/' + _this.stageToUse;
            }
        };

        this.getStage = function () {
            _this.stageToUse = getStageFromStore();
            _this.setAPIURL();
        };

        if (apiMapping === undefined || apiMapping.name.trim().length === 0) {
            console.warn('http client has some invalid initial configs');
        }

        this.serviceName = apiMapping.name;
        this.apiClient = new APIClient({});
        this.getStage();
    }

    _createClass(HttpClient, [{
        key: 'makeRequest',
        value: function makeRequest(params, path, method) {
            var body = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
            var additionalParams = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;

            this.getStage();
            return this.apiClient.invokeApi(params, path, method, additionalParams, body);
        }

        /**
         * @deprecated Use makeRequestSimple instead (damn typo)
         */

    }, {
        key: 'makeRequetSimple',
        value: function makeRequetSimple(body, path, method) {
            return this.makeRequestSimple(body, path, method);
        }
    }, {
        key: 'makeRequestSimple',
        value: function makeRequestSimple(body, path, method) {
            this.getStage();
            return this.apiClient.invokeApi(undefined, path, method, undefined, body);
        }
    }]);

    return HttpClient;
}();

export default HttpClient;
export { StoreKeys, isDefaultStage, setStageInStore, getStageFromStore };