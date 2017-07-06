"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var store = require("store");
var APIClient_1 = require("./APIClient");
var StoreKeys = {
    EdgeServiceStage: 'HTTPCLIENT.APICLIENT.STAGE',
    EdgeServiceVersionTag: 'HTTPCLIENT.APICLIENT.VERSIONTAG'
};
exports.StoreKeys = StoreKeys;
var defaultStage = 'staging';
var defaultVersionTag = 'stable';
var getStageFromStore = function () {
    'use strict';
    var fromStore = store.get(StoreKeys.EdgeServiceStage);
    return fromStore ? fromStore : defaultStage;
};
exports.getStageFromStore = getStageFromStore;
var getVersionTagFromStore = function () {
    'use strict';
    var fromStore = store.get(StoreKeys.EdgeServiceVersionTag);
    return fromStore ? fromStore : defaultVersionTag;
};
exports.getVersionTagFromStore = getVersionTagFromStore;
var setStageInStore = function (stage) {
    'use strict';
    if (stage) {
        store.set(StoreKeys.EdgeServiceStage, stage);
    }
};
exports.setStageInStore = setStageInStore;
var setVersionTagInStore = function (versionTag) {
    'use strict';
    if (versionTag) {
        store.set(StoreKeys.EdgeServiceVersionTag, versionTag);
    }
};
exports.setVersionTagInStore = setVersionTagInStore;
var isDefaultApi = function () {
    'use strict';
    return (getStageFromStore() === defaultStage) && (getVersionTagFromStore() === defaultVersionTag);
};
exports.isDefaultApi = isDefaultApi;
var HttpClient = (function () {
    function HttpClient(apiMapping) {
        var _this = this;
        this.apiClient = new APIClient_1.default({});
        this.setAPIURL = function () {
            if (_this.apiClient) {
                _this.apiClient.config.url = "https://cloudios." + _this.stageToUse + ".flowfact.cloud/edge-service/" + _this.serviceName + "/" + _this.apiVersionTag;
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
        this.getStage();
    }
    HttpClient.prototype.makeRequest = function (path, method, body, additionalParams) {
        this.getStage();
        return this.apiClient.invokeApi(path, method, additionalParams, body);
    };
    HttpClient.prototype.makeRequestSimple = function (body, path, method) {
        this.getStage();
        return this.apiClient.invokeApi(path, method, undefined, body);
    };
    return HttpClient;
}());
exports.default = HttpClient;
//# sourceMappingURL=HttpClient.js.map