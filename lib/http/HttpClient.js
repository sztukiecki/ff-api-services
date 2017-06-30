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

var setVersionTagFromStore = function setVersionTagFromStore(versionTag) {
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
    function HttpClient(apiMapping) {
        var _this = this;

        _classCallCheck(this, HttpClient);

        this.apiClient = undefined;
        this.serviceName = undefined;
        this.stageToUse = undefined;
        this.apiVersionTag = undefined;

        this.setAPIURL = function () {
            if (_this.apiClient) {
                _this.apiClient.config.url = 'https://cloudios.' + _this.stageToUse + '.flowfact.cloud/edge-service/' + _this.serviceName + '/' + _this.apiVersionTag;
            }
        };

        this.getStage = function () {
            _this.stageToUse = getStageFromStore();
            _this.apiVersionTag = getVersionTagFromStore();
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
export { StoreKeys, isDefaultApi, setStageInStore, getStageFromStore, setVersionTagFromStore, getVersionTagFromStore };