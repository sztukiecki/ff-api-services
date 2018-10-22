import {APIClient, APIMapping} from '../http';
import { AxiosResponse } from 'axios';

export class FunnelService extends APIClient {
    constructor() {
        super(APIMapping.funnelService);
    }

    getPossibleTags(funnelId: string) {
        return this.invokeApi(`/funnels/${funnelId}/possibletags`, 'GET').then(s => s.data);
    }

    getKeysForTag(funnelId: string, tagName: string) {
        return this.invokeApi(`/funnels/${funnelId}/tags/${tagName}/metadata/keys`, 'GET').then(s => s.data);
    }

    getValuesForTagKey(funnelId: string, tagName: string, metadataKey: string) {
        return this.invokeApi(`/funnels/${funnelId}/tags/${tagName}/metadata/keys/${metadataKey}/values`, 'GET').then(s => s.data);
    }

    getFunnelStatistics(funnelId: string) {
        return this.invokeApi(`/funnels/${funnelId}/statistics`, 'GET').then(s => s.data);
    }

    async getFunnelStageEntities(funnelId: string, stageId: string, page: number = 1, size: number = 10) {
        return (await this.invokeApi(`/funnels/${funnelId}/stage/${stageId}/entities`, 'GET', {page, size})).data;
    }

    createFunnel(funnelToCreate: any) {
        return this.invokeApi('/funnels', 'POST', funnelToCreate || {}).then(s => s.data);
    }

    duplicateFunnel(funnelId: string) {
        return this.invokeApi('/funnels/' + funnelId + '/duplicate','POST')
    }

    findFunnelById(funnelId: string, includeEntityIds?: boolean) {
        return this.invokeApi(`/funnels/${funnelId}`, 'GET', undefined, includeEntityIds ? {
			queryParams: {
				includeEntityIds: `${includeEntityIds}`
			}
		} : undefined);
    }

    deleteFunnelById(funnelId: string) {
        return this.invokeApi(`/funnels/${funnelId}`, 'DELETE').then(s => s.data);
    }

    getAllStagesOfAnFunnel(funnelId: string) {
        return this.invokeApi(`/funnels/${funnelId}/stages`, 'GET').then(s => s.data);
    }

    addStageAtTheEndOfTheFunnel(funnelId: string, stage: any) {
        return this.invokeApi(`/funnels/${funnelId}/stages`, 'POST', stage || {}).then(s => s.data);
    }

    findStageById(funnelId: string, stageId: string) {
        return this.invokeApi(`/funnels/${funnelId}/stages/${stageId}`, 'GET').then(s => s.data);
    }

    addStageAfterGivenStageOfGivenFunnel(funnelId: string, stageId: string, stage: any) {
        return this.invokeApi(`/funnels/${funnelId}/stages/${stageId}`, 'POST', stage).then(s => s.data);
    }

    changeAStagesOfAFunnel(funnelId: string, stageId: string, stage: any) {
        return this.invokeApi(`/funnels/${funnelId}/stages/${stageId}`, 'PUT', stage).then(s => s.data);
    }

    deleteStageFromFunnel(funnelId: string, stageId: string) {
        return this.invokeApi(`/funnels/${funnelId}/stages/${stageId}`, 'DELETE').then(s => s.data);
    }

    getStateOfTheFunnel(funnelId: string) {
        return this.invokeApi(`/funnels/${funnelId}/state`, 'GET').then(s => s.data);
    }

    changeStateOfTheFunnel(funnelId: string, state: any) {
        return this.invokeApi(`/funnels/${funnelId}/state`, 'POST', state || {}).then(s => s.data);
    }

    getAllActions(type: string = 'automatic') {
        return this.invokeApi('/funnels/actions/?type=' + type, 'GET').then(s => s.data);
    }

    executeActionForEntity(action: any, schemaId: string, entityId: string): Promise<AxiosResponse> {
        return this.invokeApi('/funnels/actions/execute/schemas/' + schemaId + '/entityId/' + entityId, 'POST', action);
    }

    getDashboardInformation(state: any) {
        if (state) {
            return this.invokeApi('/funnels/dashboard', 'GET', undefined, {queryParams: {state}}).then(s => s.data.dashboardFunnels);
        }
        return this.invokeApi('/funnels/dashboard', 'GET').then(s => s.data.dashboardFunnels);
    }

    getAvailableEntryConditionsForSchema(schemaId: string) {
        return this.invokeApi(`/availableEntryConditions/${schemaId}`, 'GET').then(s => s.data);
    }

    getAvailableEntryConditionsForPrevStage(funnelId: string, stageId: string) {
        return this.invokeApi(`/funnels/${funnelId}/stages/${stageId}/availableEntryConditions`, 'GET').then(s => s.data);
    }

    updateFunnelById(funnelId: string, data: any) {
        return this.invokeApi(`/funnels/${funnelId}`, 'PUT', data);
    }

    setStageAsFirstStage(funnelId: string, stageId: string) {
        return this.invokeApi(`/funnels/${funnelId}/stages/${stageId}/parent`, 'PUT');
    }

    setStageAfterStage(funnelId: string, stageId: string, parentId: string) {
        return this.invokeApi(`/funnels/${funnelId}/stages/${stageId}/parent/${parentId}`, 'PUT');
    }
}

export default new FunnelService();
