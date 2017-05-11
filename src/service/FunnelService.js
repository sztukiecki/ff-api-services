import HttpClient, {APIMapping} from '../http';

export default class FunnelService {

    constructor() {
        this.client = new HttpClient(APIMapping.funnelService);
    }


    getPossibleTags(funnelId){
        return this.client.makeRequetSimple({}, `/funnels/${funnelId}/possibletags`, 'GET').then(s => s.data);
    }

    getFunnelStatistics(funnelId){
        return this.client.makeRequetSimple({}, `/funnels/${funnelId}/statistics`, 'GET').then(s => s.data);
    }
    /**
     * createFunnel
     * @param { object } funnelToCreate funnelToCreate
     */
    createFunnel(funnelToCreate) {
        return this.client.makeRequetSimple(funnelToCreate || {}, '/funnels', 'POST').then(s => s.data);
    }

    /**
     * findFunnelById
     * @param { string } funnelId funnelId
     */
    findFunnelById(funnelId) {
        return this.client.makeRequetSimple({}, `/funnels/${funnelId}`, 'GET').then(s => s.data);
    }

    /**
     * deleteFunnelById
     * @param { string } funnelId funnelId
     */
    deleteFunnelById(funnelId) {
        return this.client.makeRequetSimple({}, `/funnels/${funnelId}`, 'DELETE').then(s => s.data);
    }

    /**
     * getAllStagesOfAnFunnel
     * @param { string } funnelId funnelId
     */
    getAllStagesOfAnFunnel(funnelId) {
        return this.client.makeRequetSimple({}, `/funnels/${funnelId}/stages`, 'GET').then(s => s.data);
    }

    /**
     * addStageAtTheEndOfTheFunnel
     * @param { string } funnelId funnelId
     * @param { object } stage stage
     */
    addStageAtTheEndOfTheFunnel(funnelId, stage) {
        return this.client.makeRequetSimple(stage || {}, `/funnels/${funnelId}/stages`, 'POST').then(s => s.data);
    }

    /**
     * getAStagesOfAFunnel
     * @param { string } funnelId funnelId
     * @param { string } stageId stageId
     */
    findStageById(funnelId, stageId) {
        return this.client.makeRequetSimple({}, `/funnels/${funnelId}/stages/${stageId}`, 'GET').then(s => s.data);
    }

    /**
     * addStageAfterGivenStageOfGivenFunnel
     * @param { string } funnelId funnelId
     * @param { string } stageId stageId
     * @param { object } stage stage
     */
    addStageAfterGivenStageOfGivenFunnel(funnelId, stageId, stage) {
        return this.client.makeRequetSimple(stage, `/funnels/${funnelId}/stages/${stageId}`, 'POST').then(s => s.data);
    }

    /**
     * changeAStagesOfAFunnel
     * @param { string } funnelId funnelId
     * @param { string } stageId stageId
     * @param { object } stage stage
     */
    changeAStagesOfAFunnel(funnelId, stageId, stage) {
        return this.client.makeRequetSimple(stage, `/funnels/${funnelId}/stages/${stageId}`, 'PUT').then(s => s.data);
    }

    /**
     * deleteStageFromFunnel
     * @param { string } funnelId funnelId
     * @param { string } stageId stageId
     */
    deleteStageFromFunnel(funnelId, stageId) {
        return this.client.makeRequetSimple({}, `/funnels/${funnelId}/stages/${stageId}`, 'DELETE').then(s => s.data);
    }

    /**
     * getStateOfTheFunnel
     * @param { string } funnelId funnelId
     */
    getStateOfTheFunnel(funnelId) {
        return this.client.makeRequetSimple({}, `/funnels/${funnelId}/state`, 'GET').then(s => s.data);
    }

    /**
     * changeStateOfTheFunnel
     * @param { string } funnelId funnelId
     * @param { object } state state
     */
    changeStateOfTheFunnel(funnelId, state) {
        return this.client.makeRequetSimple(state || {}, `/funnels/${funnelId}/state`, 'POST').then(s => s.data);
    }

    /**
     * getAllActions
     */
    getAllActions() {
        return this.client.makeRequetSimple({}, '/funnels/actions', 'GET').then(s => s.data.actionList);
    }

    /**
     * getDashboardInformation
     * @param { object } state state
     */
    getDashboardInformation(state) {
        if (state) {
            return this.client.makeRequest({}, '/funnels/dashboard', 'GET', undefined, {queryParams: {state}}).then(s => s.data.dashboardFunnels);
        }
        return this.client.makeRequetSimple({}, '/funnels/dashboard', 'GET').then(s => s.data.dashboardFunnels);
    }

    /**
     * getAvailableEntryConditionsForSchema
     * @param { object } state state
     */
    getAvailableEntryConditionsForSchema(schemaId) {
        return this.client.makeRequetSimple({}, `/availableEntryConditions/${schemaId}`, 'GET').then(s => s.data);
    }

    /**
     * getAvailableEntryConditionsForPrevStage
     * @param { object } state state
     */
    getAvailableEntryConditionsForPrevStage(funnelId, stageId) {
        return this.client.makeRequetSimple({}, `/funnels/${funnelId}/stages/${stageId}/availableEntryConditions`, 'GET').then(s => s.data);
    }

    /**
     * updateFunnelById
     * @param funnelId
     *      The id of the funnel
     * @param data
     *      The model of the funnel as object
     */
    updateFunnelById(funnelId, data) {
        return this.client.makeRequest({}, `/funnels/${funnelId}`, 'PUT', data);
    }

    setStageAsFirstStage(funnelId, stageId) {
        return this.client.makeRequest({}, `/funnels/${funnelId}/stages/${stageId}/parent`, 'PUT');
    }

    setStageAfterStage(funnelId, stageId, parentId) {
        return this.client.makeRequest({}, `/funnels/${funnelId}/stages/${stageId}/parent/${parentId}`, 'PUT');
    }
}
