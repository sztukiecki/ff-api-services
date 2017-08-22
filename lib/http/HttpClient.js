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
        console.log('Set stage to: ' + stage);
    }
};
exports.setStageInStore = setStageInStore;
var setVersionTagInStore = function (versionTag) {
    'use strict';
    if (versionTag) {
        store.set(StoreKeys.EdgeServiceVersionTag, versionTag);
        console.log('Set versionTag to: ' + versionTag);
    }
};
exports.setVersionTagInStore = setVersionTagInStore;
var isDefaultApi = function () {
    'use strict';
    return (getStageFromStore() === defaultStage) && (getVersionTagFromStore() === defaultVersionTag);
};
exports.isDefaultApi = isDefaultApi;
var HttpClient = /** @class */ (function () {
    function HttpClient(apiService) {
        var _this = this;
        // https://services.production.cloudios.flowfact-prod.cloud/edge-service/management/health
        this.buildAPIUrl = function () {
            var account = _this.stageToUse === 'development' ? 'flowfact-dev' : 'flowfact-prod';
            var baseUrl = _this.stageToUse === 'local'
                ? 'http://localhost:8080/edge-service'
                : "https://services." + _this.stageToUse + ".cloudios." + account + ".cloud/edge-service";
            return baseUrl + "/" + _this.apiService.name + "/" + _this.apiVersionTag;
        };
        this.apiService = apiService;
        this.stageToUse = getStageFromStore();
        this.apiVersionTag = getVersionTagFromStore();
        this.apiClient = new APIClient_1.default({
            'axios': apiService.axiosConfiguration,
            'url': this.buildAPIUrl()
        });
    }
    HttpClient.prototype.makeRequest = function (path, method, body, additionalParams) {
        return this.apiClient.invokeApi(path, method, additionalParams, body);
    };
    HttpClient.prototype.makeRequestSimple = function (body, path, method) {
        return this.apiClient.invokeApi(path, method, undefined, body);
    };
    return HttpClient;
}());
exports.default = HttpClient;
//# sourceMappingURL=HttpClient.js.map