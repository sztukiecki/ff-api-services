import { APIClient, APIMapping } from './http';
import { AxiosResponse } from 'axios';

export class FunnelService extends APIClient {
    constructor() {
        super(APIMapping.funnelService);
    }

    /**
     * TODO: Please comment this method
     * @param funnelId
     */
    async fethcPossibleTags(funnelId: string) {
        return this.invokeApi(`/funnels/${funnelId}/possibletags`, 'GET').then(s => s.data);
    }

    /**
     * TODO: Please comment this method
     * @param funnelId
     * @param tagName
     */
    async fetchKeysForTag(funnelId: string, tagName: string) {
        return this.invokeApi(`/funnels/${funnelId}/tags/${tagName}/metadata/keys`, 'GET').then(s => s.data);
    }

    /**
     * TODO: Please comment this method
     * @param funnelId
     * @param tagName
     * @param metadataKey
     */
    async fetchValuesForTagKey(funnelId: string, tagName: string, metadataKey: string) {
        return this.invokeApi(`/funnels/${funnelId}/tags/${tagName}/metadata/keys/${metadataKey}/values`, 'GET').then(s => s.data);
    }

    /**
     * TODO: Please comment this method
     * @param funnelId
     */
    async fetchFunnelStatistics(funnelId: string) {
        return this.invokeApi(`/funnels/${funnelId}/statistics`, 'GET').then(s => s.data);
    }

    /**
     * TODO: Please comment this method
     * @param funnelId
     * @param stageId
     * @param page
     * @param size
     */
    async fetchFunnelStageEntities(funnelId: string, stageId: string, page: number = 1, size: number = 10) {
        return (await this.invokeApi(`/funnels/${funnelId}/stage/${stageId}/entities`, 'GET', {page, size})).data;
    }

    /**
     * TODO: Please comment this method
     * @param funnelToCreate
     */
    async createFunnel(funnelToCreate: any) {
        return this.invokeApi('/funnels', 'POST', funnelToCreate || {}).then(s => s.data);
    }

    /**
     * TODO: Please comment this method
     * @param funnelId
     */
    async duplicateFunnel(funnelId: string) {
        return this.invokeApi('/funnels/' + funnelId + '/duplicate', 'POST');
    }

    /**
     * TODO: Please comment this method
     * @param funnelId
     * @param includeEntityIds
     */
    async findFunnelById(funnelId: string, includeEntityIds?: boolean) {
        return this.invokeApi(`/funnels/${funnelId}`, 'GET', undefined, includeEntityIds ? {
            queryParams: {
                includeEntityIds: `${includeEntityIds}`
            }
        } : undefined);
    }

    /**
     * TODO: Please comment this method
     * @param funnelId
     */
    async deleteFunnelById(funnelId: string) {
        return this.invokeApi(`/funnels/${funnelId}`, 'DELETE').then(s => s.data);
    }

    /**
     * TODO: Please comment this method
     * @param funnelId
     */
    async fetchAllStagesOfAnFunnel(funnelId: string) {
        return this.invokeApi(`/funnels/${funnelId}/stages`, 'GET').then(s => s.data);
    }

    /**
     * TODO: Please comment this method
     * @param funnelId
     * @param stage
     */
    async addStageAtTheEndOfTheFunnel(funnelId: string, stage: any) {
        return this.invokeApi(`/funnels/${funnelId}/stages`, 'POST', stage || {}).then(s => s.data);
    }

    /**
     * TODO: Please comment this method
     * @param funnelId
     * @param stageId
     */
    async findStageById(funnelId: string, stageId: string) {
        return this.invokeApi(`/funnels/${funnelId}/stages/${stageId}`, 'GET').then(s => s.data);
    }

    /**
     * TODO: Please comment this method
     * @param funnelId
     * @param stageId
     * @param stage
     */
    async addStageAfterGivenStageOfGivenFunnel(funnelId: string, stageId: string, stage: any) {
        return this.invokeApi(`/funnels/${funnelId}/stages/${stageId}`, 'POST', stage).then(s => s.data);
    }

    /**
     * TODO: Please comment this method
     * @param funnelId
     * @param stageId
     * @param stage
     */
    async changeAStagesOfAFunnel(funnelId: string, stageId: string, stage: any) {
        return this.invokeApi(`/funnels/${funnelId}/stages/${stageId}`, 'PUT', stage).then(s => s.data);
    }

    /**
     * TODO: Please comment this method
     * @param funnelId
     * @param stageId
     */
    async deleteStageFromFunnel(funnelId: string, stageId: string) {
        return this.invokeApi(`/funnels/${funnelId}/stages/${stageId}`, 'DELETE').then(s => s.data);
    }

    /**
     * TODO: Please comment this method
     * @param funnelId
     */
    async fetchStateOfTheFunnel(funnelId: string) {
        return this.invokeApi(`/funnels/${funnelId}/state`, 'GET').then(s => s.data);
    }

    /**
     * TODO: Please comment this method
     * @param funnelId
     * @param state
     */
    async changeStateOfTheFunnel(funnelId: string, state: any) {
        return this.invokeApi(`/funnels/${funnelId}/state`, 'POST', state || {}).then(s => s.data);
    }

    /**
     * TODO: Please comment this method
     * @param type
     */
    async fetchAllActions(type: string = 'automatic') {
        return this.invokeApi('/funnels/actions/?type=' + type, 'GET').then(s => s.data);
    }

    /**
     * TODO: Please comment this method
     * @param action
     * @param schemaId
     * @param entityId
     */
    async executeActionForEntity(action: any, schemaId: string, entityId: string): Promise<AxiosResponse> {
        return this.invokeApi('/funnels/actions/execute/schemas/' + schemaId + '/entityId/' + entityId, 'POST', action);
    }

    /**
     * TODO: Please comment this method
     * @param state
     */
    async fetchDashboardInformation(state: any) {
        if (state) {
            return this.invokeApi('/funnels/dashboard', 'GET', undefined, {queryParams: {state}}).then(s => s.data.dashboardFunnels);
        }
        return this.invokeApi('/funnels/dashboard', 'GET').then(s => s.data.dashboardFunnels);
    }

    /**
     * TODO: Please comment this method
     * @param schemaId
     */
    async fetchAvailableEntryConditionsForSchema(schemaId: string) {
        return this.invokeApi(`/availableEntryConditions/${schemaId}`, 'GET').then(s => s.data);
    }

    /**
     * TODO: Please comment this method
     * @param funnelId
     * @param stageId
     */
    async fetchAvailableEntryConditionsForPrevStage(funnelId: string, stageId: string) {
        return this.invokeApi(`/funnels/${funnelId}/stages/${stageId}/availableEntryConditions`, 'GET').then(s => s.data);
    }

    /**
     * TODO: Please comment this method
     * @param funnelId
     * @param data
     */
    async updateFunnelById(funnelId: string, data: any) {
        return this.invokeApi(`/funnels/${funnelId}`, 'PUT', data);
    }

    /**
     * TODO: Please comment this method
     * @param funnelId
     * @param stageId
     */
    async setStageAsFirstStage(funnelId: string, stageId: string) {
        return this.invokeApi(`/funnels/${funnelId}/stages/${stageId}/parent`, 'PUT');
    }

    /**
     * TODO: Please comment this method
     * @param funnelId
     * @param stageId
     * @param parentId
     */
    async setStageAfterStage(funnelId: string, stageId: string, parentId: string) {
        return this.invokeApi(`/funnels/${funnelId}/stages/${stageId}/parent/${parentId}`, 'PUT');
    }
}

export default new FunnelService();
