"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("../http");
var FunnelService = (function () {
    function FunnelService() {
    }
    FunnelService.getPossibleTags = function (funnelId) {
        return FunnelService.client.makeRequestSimple({}, "/funnels/" + funnelId + "/possibletags", 'GET').then(function (s) { return s.data; });
    };
    FunnelService.getKeysForTag = function (funnelId, tagName) {
        return FunnelService.client.makeRequestSimple({}, "/funnels/" + funnelId + "/tags/" + tagName + "/metadata/keys", 'GET').then(function (s) { return s.data; });
    };
    FunnelService.getValuesForTagKey = function (funnelId, tagName, metadataKey) {
        return FunnelService.client.makeRequestSimple({}, "/funnels/" + funnelId + "/tags/" + tagName + "/metadata/keys/" + metadataKey + "/values", 'GET').then(function (s) { return s.data; });
    };
    FunnelService.getFunnelStatistics = function (funnelId) {
        return FunnelService.client.makeRequestSimple({}, "/funnels/" + funnelId + "/statistics", 'GET').then(function (s) { return s.data; });
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
            return FunnelService.client.makeRequest({}, '/funnels/dashboard', 'GET', undefined, { queryParams: { state: state } }).then(function (s) { return s.data.dashboardFunnels; });
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
        return FunnelService.client.makeRequest({}, "/funnels/" + funnelId, 'PUT', data);
    };
    FunnelService.setStageAsFirstStage = function (funnelId, stageId) {
        return FunnelService.client.makeRequest({}, "/funnels/" + funnelId + "/stages/" + stageId + "/parent", 'PUT');
    };
    FunnelService.setStageAfterStage = function (funnelId, stageId, parentId) {
        return FunnelService.client.makeRequest({}, "/funnels/" + funnelId + "/stages/" + stageId + "/parent/" + parentId, 'PUT');
    };
    FunnelService.client = new http_1.default(http_1.APIMapping.funnelService);
    return FunnelService;
}());
exports.default = FunnelService;
//# sourceMappingURL=FunnelService.js.map