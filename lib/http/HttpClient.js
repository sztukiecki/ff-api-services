var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import store from 'store';
import APIClient from './APIClient';

var StoreKeys = {
    EdgeServiceStage: 'HTTPCLIENT.APICLIENT.STAGE',
    EdgeServiceVersionTag: 'HTTPCLIENT.APICLIENT.VERSIONTAG'
};

var defaultStage = 'staging';
var defaultVersionTag = 'stable';

var getStageFromStore = function getStageFromStore() {
    'use strict';

    var fromStore = store.get(StoreKeys.EdgeServiceStage);
    return fromStore ? fromStore : defaultStage;
};

var getVersionTagFromStore = function getVersionTagFromStore() {
    'use strict';

    var fromStore = store.get(StoreKeys.EdgeServiceVersionTag);
    return fromStore ? fromStore : defaultVersionTag;
};

var setStageInStore = function setStageInStore(stage) {
    'use strict';

    if (stage) {
        store.set(StoreKeys.EdgeServiceStage, stage);
    }
};

var setVersionTagInStore = function setVersionTagInStore(versionTag) {
    'use strict';

    if (versionTag) {
        store.set(StoreKeys.EdgeServiceVersionTag, versionTag);
    }
};

var isDefaultApi = function isDefaultApi() {
    'use strict';

    return getStageFromStore() === defaultStage && getVersionTagFromStore() === defaultVersionTag;
};

var HttpClient = function () {
    function HttpClient(apiService) {
        var _this = this;

        _classCallCheck(this, HttpClient);

        this.apiClient = undefined;
        this.apiService = undefined;
        this.stageToUse = undefined;
        this.apiVersionTag = undefined;

        this.buildAPIUrl = function () {
            var account = _this.stageToUse === 'development' ? 'flowfact-dev' : 'flowfact-prod';
            var baseUrl = _this.stageToUse === 'local' ? 'http://localhost:8080/edge-service' : 'https://services.' + _this.stageToUse + '.cloudios.' + account + '.cloud/edge-service';
            return baseUrl + '/' + _this.apiService.name + '/' + _this.apiVersionTag;
        };

        this.apiService = apiService;
        this.stageToUse = getStageFromStore();
        this.apiVersionTag = getVersionTagFromStore();
        this.apiClient = new APIClient({
            'axios': apiService.axiosConfiguration,
            'url': this.buildAPIUrl()
        });
    }
    // https://services.production.cloudios.flowfact-prod.cloud/edge-service/management/health


    _createClass(HttpClient, [{
        key: 'makeRequest',
        value: function makeRequest(params, path, method) {
            var body = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
            var additionalParams = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;

            return this.apiClient.invokeApi(params, path, method, additionalParams, body);
        }
    }, {
        key: 'makeRequestSimple',
        value: function makeRequestSimple(body, path, method) {
            return this.apiClient.invokeApi(undefined, path, method, undefined, body);
        }
    }]);

    return HttpClient;
}();

export default HttpClient;
export { StoreKeys, isDefaultApi, setStageInStore, getStageFromStore, setVersionTagInStore, getVersionTagFromStore };