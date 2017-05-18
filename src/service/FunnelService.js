import HttpClient, {APIMapping} from '../http';

export default class FunnelService {
    static client = new HttpClient(APIMapping.funnelService);

    static getPossibleTags(funnelId) {
        return FunnelService.client.makeRequetSimple({}, `/funnels/${funnelId}/possibletags`, 'GET').then(s => s.data);
    }

    static getFunnelStatistics(funnelId) {
        return FunnelService.client.makeRequetSimple({}, `/funnels/${funnelId}/statistics`, 'GET').then(s => s.data);
    }
    /**
     * createFunnel
     * @param { object } funnelToCreate funnelToCreate
     */
    static createFunnel(funnelToCreate) {
        return FunnelService.client.makeRequetSimple(funnelToCreate || {}, '/funnels', 'POST').then(s => s.data);
    }

    /**
     * findFunnelById
     * @param { string } funnelId funnelId
     */
    static findFunnelById(funnelId) {
        return FunnelService.client.makeRequetSimple({}, `/funnels/${funnelId}`, 'GET').then(s => s.data);
    }

    /**
     * deleteFunnelById
     * @param { string } funnelId funnelId
     */
    static deleteFunnelById(funnelId) {
        return FunnelService.client.makeRequetSimple({}, `/funnels/${funnelId}`, 'DELETE').then(s => s.data);
    }

    /**
     * getAllStagesOfAnFunnel
     * @param { string } funnelId funnelId
     */
    static getAllStagesOfAnFunnel(funnelId) {
        return FunnelService.client.makeRequetSimple({}, `/funnels/${funnelId}/stages`, 'GET').then(s => s.data);
    }

    /**
     * addStageAtTheEndOfTheFunnel
     * @param { string } funnelId funnelId
     * @param { object } stage stage
     */
    static addStageAtTheEndOfTheFunnel(funnelId, stage) {
        return FunnelService.client.makeRequetSimple(stage || {}, `/funnels/${funnelId}/stages`, 'POST').then(s => s.data);
    }

    /**
     * getAStagesOfAFunnel
     * @param { string } funnelId funnelId
     * @param { string } stageId stageId
     */
    static findStageById(funnelId, stageId) {
        return FunnelService.client.makeRequetSimple({}, `/funnels/${funnelId}/stages/${stageId}`, 'GET').then(s => s.data);
    }

    /**
     * addStageAfterGivenStageOfGivenFunnel
     * @param { string } funnelId funnelId
     * @param { string } stageId stageId
     * @param { object } stage stage
     */
    static addStageAfterGivenStageOfGivenFunnel(funnelId, stageId, stage) {
        return FunnelService.client.makeRequetSimple(stage, `/funnels/${funnelId}/stages/${stageId}`, 'POST').then(s => s.data);
    }

    /**
     * changeAStagesOfAFunnel
     * @param { string } funnelId funnelId
     * @param { string } stageId stageId
     * @param { object } stage stage
     */
    static changeAStagesOfAFunnel(funnelId, stageId, stage) {
        return FunnelService.client.makeRequetSimple(stage, `/funnels/${funnelId}/stages/${stageId}`, 'PUT').then(s => s.data);
    }

    /**
     * deleteStageFromFunnel
     * @param { string } funnelId funnelId
     * @param { string } stageId stageId
     */
    static deleteStageFromFunnel(funnelId, stageId) {
        return FunnelService.client.makeRequetSimple({}, `/funnels/${funnelId}/stages/${stageId}`, 'DELETE').then(s => s.data);
    }

    /**
     * getStateOfTheFunnel
     * @param { string } funnelId funnelId
     */
    static getStateOfTheFunnel(funnelId) {
        return FunnelService.client.makeRequetSimple({}, `/funnels/${funnelId}/state`, 'GET').then(s => s.data);
    }

    /**
     * changeStateOfTheFunnel
     * @param { string } funnelId funnelId
     * @param { object } state state
     */
    static changeStateOfTheFunnel(funnelId, state) {
        return FunnelService.client.makeRequetSimple(state || {}, `/funnels/${funnelId}/state`, 'POST').then(s => s.data);
    }

    /**
     * getAllActions
     */
    static getAllActions(type = 'automatic') {
        return FunnelService.client.makeRequetSimple({}, '/funnels/actions/?type=' + type, 'GET').then(s => s.data);
    }
    /*
     * executeActionForEntity
     */
    static executeActionForEntity(action, schemaId, entityId) {
        return FunnelService.client.makeRequetSimple(action, '/funnels/actions/execute/schemas/' + schemaId + '/entityId/' + entityId, 'POST');
    }
    /**
     * getDashboardInformation
     * @param { object } state state
     */
    static getDashboardInformation(state) {
        if (state) {
            return FunnelService.client.makeRequest({}, '/funnels/dashboard', 'GET', undefined, {queryParams: {state}}).then(s => s.data.dashboardFunnels);
        }
        return FunnelService.client.makeRequetSimple({}, '/funnels/dashboard', 'GET').then(s => s.data.dashboardFunnels);
    }

    /**
     * getAvailableEntryConditionsForSchema
     * @param { object } state state
     */
    static getAvailableEntryConditionsForSchema(schemaId) {
        return FunnelService.client.makeRequetSimple({}, `/availableEntryConditions/${schemaId}`, 'GET').then(s => s.data);
    }

    /**
     * getAvailableEntryConditionsForPrevStage
     * @param { object } state state
     */
    static getAvailableEntryConditionsForPrevStage(funnelId, stageId) {
        return FunnelService.client.makeRequetSimple({}, `/funnels/${funnelId}/stages/${stageId}/availableEntryConditions`, 'GET').then(s => s.data);
    }

    /**
     * updateFunnelById
     * @param funnelId
     *      The id of the funnel
     * @param data
     *      The model of the funnel as object
     */
    static updateFunnelById(funnelId, data) {
        return FunnelService.client.makeRequest({}, `/funnels/${funnelId}`, 'PUT', data);
    }

    static setStageAsFirstStage(funnelId, stageId) {
        return FunnelService.client.makeRequest({}, `/funnels/${funnelId}/stages/${stageId}/parent`, 'PUT');
    }

    static setStageAfterStage(funnelId, stageId, parentId) {
        return FunnelService.client.makeRequest({}, `/funnels/${funnelId}/stages/${stageId}/parent/${parentId}`, 'PUT');
    }
}
