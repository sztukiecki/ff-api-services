"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("../http");
var FunnelService = /** @class */ (function () {
    function FunnelService() {
    }
    /**
     * getPossibleTags
     * @param { string } funnelId funnelId
     */
    FunnelService.getPossibleTags = function (funnelId) {
        return FunnelService.client.makeRequestSimple({}, "/funnels/" + funnelId + "/possibletags", 'GET').then(function (s) { return s.data; });
    };
    /**
     * getKeysForTag
     * @param { string } funnelId funnelId
     * @param { string } tagName tagName
     */
    FunnelService.getKeysForTag = function (funnelId, tagName) {
        return FunnelService.client.makeRequestSimple({}, "/funnels/" + funnelId + "/tags/" + tagName + "/metadata/keys", 'GET').then(function (s) { return s.data; });
    };
    /**
     * getValuesForTagKey
     * @param { string } funnelId funnelId
     * @param { string } tagName tagName
     * @param { string } metadataKey metadataKey
     */
    FunnelService.getValuesForTagKey = function (funnelId, tagName, metadataKey) {
        return FunnelService.client.makeRequestSimple({}, "/funnels/" + funnelId + "/tags/" + tagName + "/metadata/keys/" + metadataKey + "/values", 'GET').then(function (s) { return s.data; });
    };
    /**
     * getFunnelStatistics
     * @param { string } funnelId funnelId
     */
    FunnelService.getFunnelStatistics = function (funnelId) {
        return FunnelService.client.makeRequestSimple({}, "/funnels/" + funnelId + "/statistics", 'GET').then(function (s) { return s.data; });
    };
    /**
     * getFunnelStageEntities
     * @param { string } funnelId funnelId
     * @param { string } stageId stageId
     * @param { number } page page
     * @param { number} size size
     */
    FunnelService.getFunnelStageEntities = function (funnelId, stageId, page, size) {
        if (page === void 0) { page = 1; }
        if (size === void 0) { size = 10; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, FunnelService.client.makeRequestSimple({ page: page, size: size }, "/funnels/" + funnelId + "/stage/" + stageId + "/entities", 'GET')];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    /**
     * createFunnel
     * @param { object } funnelToCreate funnelToCreate
     */
    FunnelService.createFunnel = function (funnelToCreate) {
        return FunnelService.client.makeRequestSimple(funnelToCreate || {}, '/funnels', 'POST').then(function (s) { return s.data; });
    };
    /**
     * findFunnelById
     * @param { string } funnelId funnelId
     */
    FunnelService.findFunnelById = function (funnelId) {
        return FunnelService.client.makeRequestSimple({}, "/funnels/" + funnelId, 'GET').then(function (s) { return s.data; });
    };
    /**
     * deleteFunnelById
     * @param { string } funnelId funnelId
     */
    FunnelService.deleteFunnelById = function (funnelId) {
        return FunnelService.client.makeRequestSimple({}, "/funnels/" + funnelId, 'DELETE').then(function (s) { return s.data; });
    };
    /**
     * getAllStagesOfAnFunnel
     * @param { string } funnelId funnelId
     */
    FunnelService.getAllStagesOfAnFunnel = function (funnelId) {
        return FunnelService.client.makeRequestSimple({}, "/funnels/" + funnelId + "/stages", 'GET').then(function (s) { return s.data; });
    };
    /**
     * addStageAtTheEndOfTheFunnel
     * @param { string } funnelId funnelId
     * @param { object } stage stage
     */
    FunnelService.addStageAtTheEndOfTheFunnel = function (funnelId, stage) {
        return FunnelService.client.makeRequestSimple(stage || {}, "/funnels/" + funnelId + "/stages", 'POST').then(function (s) { return s.data; });
    };
    /**
     * getAStagesOfAFunnel
     * @param { string } funnelId funnelId
     * @param { string } stageId stageId
     */
    FunnelService.findStageById = function (funnelId, stageId) {
        return FunnelService.client.makeRequestSimple({}, "/funnels/" + funnelId + "/stages/" + stageId, 'GET').then(function (s) { return s.data; });
    };
    /**
     * addStageAfterGivenStageOfGivenFunnel
     * @param { string } funnelId funnelId
     * @param { string } stageId stageId
     * @param { object } stage stage
     */
    FunnelService.addStageAfterGivenStageOfGivenFunnel = function (funnelId, stageId, stage) {
        return FunnelService.client.makeRequestSimple(stage, "/funnels/" + funnelId + "/stages/" + stageId, 'POST').then(function (s) { return s.data; });
    };
    /**
     * changeAStagesOfAFunnel
     * @param { string } funnelId funnelId
     * @param { string } stageId stageId
     * @param { object } stage stage
     */
    FunnelService.changeAStagesOfAFunnel = function (funnelId, stageId, stage) {
        return FunnelService.client.makeRequestSimple(stage, "/funnels/" + funnelId + "/stages/" + stageId, 'PUT').then(function (s) { return s.data; });
    };
    /**
     * deleteStageFromFunnel
     * @param { string } funnelId funnelId
     * @param { string } stageId stageId
     */
    FunnelService.deleteStageFromFunnel = function (funnelId, stageId) {
        return FunnelService.client.makeRequestSimple({}, "/funnels/" + funnelId + "/stages/" + stageId, 'DELETE').then(function (s) { return s.data; });
    };
    /**
     * getStateOfTheFunnel
     * @param { string } funnelId funnelId
     */
    FunnelService.getStateOfTheFunnel = function (funnelId) {
        return FunnelService.client.makeRequestSimple({}, "/funnels/" + funnelId + "/state", 'GET').then(function (s) { return s.data; });
    };
    /**
     * changeStateOfTheFunnel
     * @param { string } funnelId funnelId
     * @param { object } state state
     */
    FunnelService.changeStateOfTheFunnel = function (funnelId, state) {
        return FunnelService.client.makeRequestSimple(state || {}, "/funnels/" + funnelId + "/state", 'POST').then(function (s) { return s.data; });
    };
    /**
     * getAllActions
     */
    FunnelService.getAllActions = function (type) {
        if (type === void 0) { type = 'automatic'; }
        return FunnelService.client.makeRequestSimple({}, '/funnels/actions/?type=' + type, 'GET').then(function (s) { return s.data; });
    };
    /*
     * executeActionForEntity
     */
    FunnelService.executeActionForEntity = function (action, schemaId, entityId) {
        return FunnelService.client.makeRequestSimple(action, '/funnels/actions/execute/schemas/' + schemaId + '/entityId/' + entityId, 'POST');
    };
    /**
     * getDashboardInformation
     * @param { object } state state
     */
    FunnelService.getDashboardInformation = function (state) {
        if (state) {
            return FunnelService.client.makeRequest('/funnels/dashboard', 'GET', undefined, { queryParams: { state: state } }).then(function (s) { return s.data.dashboardFunnels; });
        }
        return FunnelService.client.makeRequestSimple({}, '/funnels/dashboard', 'GET').then(function (s) { return s.data.dashboardFunnels; });
    };
    /**
     * getAvailableEntryConditionsForSchema
     * @param { object } state state
     */
    FunnelService.getAvailableEntryConditionsForSchema = function (schemaId) {
        return FunnelService.client.makeRequestSimple({}, "/availableEntryConditions/" + schemaId, 'GET').then(function (s) { return s.data; });
    };
    /**
     * getAvailableEntryConditionsForPrevStage
     * @param { object } state state
     */
    FunnelService.getAvailableEntryConditionsForPrevStage = function (funnelId, stageId) {
        return FunnelService.client.makeRequestSimple({}, "/funnels/" + funnelId + "/stages/" + stageId + "/availableEntryConditions", 'GET').then(function (s) { return s.data; });
    };
    /**
     * updateFunnelById
     * @param funnelId
     *      The id of the funnel
     * @param data
     *      The model of the funnel as object
     */
    FunnelService.updateFunnelById = function (funnelId, data) {
        return FunnelService.client.makeRequest("/funnels/" + funnelId, 'PUT', data);
    };
    FunnelService.setStageAsFirstStage = function (funnelId, stageId) {
        return FunnelService.client.makeRequest("/funnels/" + funnelId + "/stages/" + stageId + "/parent", 'PUT');
    };
    FunnelService.setStageAfterStage = function (funnelId, stageId, parentId) {
        return FunnelService.client.makeRequest("/funnels/" + funnelId + "/stages/" + stageId + "/parent/" + parentId, 'PUT');
    };
    FunnelService.client = new http_1.default(http_1.APIMapping.funnelService);
    return FunnelService;
}());
exports.default = FunnelService;
//# sourceMappingURL=FunnelService.js.map