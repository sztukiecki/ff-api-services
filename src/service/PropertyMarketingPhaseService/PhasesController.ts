import { APIClient, APIMapping } from '../../http';
import { EntityPhaseInformation, EntityQuery, PhaseConfigurationInformation } from '../..';
import { PropertyMarketingPhaseServiceTypes } from './PropertyMarketingPhaseService.Types';

import PhasesResponse = PropertyMarketingPhaseServiceTypes.PhasesResponse;
import Phase = PropertyMarketingPhaseServiceTypes.Phase;
import Widget = PropertyMarketingPhaseServiceTypes.Widget;

export class PhasesController extends APIClient {
    constructor() {
        super(APIMapping.propertyMarketingPhaseService);
    }

    /**
     * TODO: Please comment this method
     * @param schemaId
     */
    async fetchPhases(schemaId: string) {
        return await this.invokeApiWithErrorHandling<PhasesResponse>(`/${schemaId}/phases`, 'GET');
    }

    /**
     * TODO: Please comment this method
     * @param schemaId
     * @param phaseName
     */
    async fetchPhase(schemaId: string, phaseName: string) {
        return await this.invokeApiWithErrorHandling(`/${schemaId}/phases/${phaseName}`, 'GET');
    }

    /**
     * TODO: Please comment this method
     * @param phaseName
     * @param page
     * @param size
     * @param archived
     * @param inactive
     */
    async fetchEntitiesInPhase(phaseName: string, page: number = 1, size: number = 50, archived = true, inactive = true) {
        return await this.invokeApiWithErrorHandling<string[]>(`/phases/${phaseName}/entities`, 'GET', undefined, {
            queryParams: {
                archived: archived.toString(),
                inactive: inactive.toString(),
                page,
                size,
            },
        });
    }

    /**
     * TODO: Please comment this method
     * @param phaseName
     * @param schemaId
     * @param page
     * @param size
     * @param archived
     * @param inactive
     */
    async fetchEntitiesInPhaseAndSchema(phaseName: string, schemaId: string, page: number = 1, size: number = 50, archived = true, inactive = true) {
        return await this.invokeApiWithErrorHandling<string[]>(`/phases/${phaseName}/entities/${schemaId}`, 'GET', undefined, {
            queryParams: {
                archived: archived.toString(),
                inactive: inactive.toString(),
                page,
                size,
            },
        });
    }

    /**
     * TODO: Please comment this method
     * @param schemaId
     * @param entityId
     */
    async fetchCurrentPhase(schemaId: string, entityId: string) {
        return await this.invokeApiWithErrorHandling<Phase>(`/${schemaId}/${entityId}/currentPhase`, 'GET');
    }

    /**
     * TODO: Please comment this method
     * @param schemaId
     * @param entityId
     * @param stepId
     * @param completed
     */
    async updateStep(schemaId: string, entityId: string, stepId: string, completed: boolean) {
        return await this.invokeApiWithErrorHandling(`/${schemaId}/${entityId}/updateStep`, 'POST', {
            stepId: stepId,
            completed: completed,
        });
    }

    /**
     * Switches to next step using the step switch validator.
     * @param schemaId
     * @param entityId
     * @param stepId
     * @param source as string / enum, represents either KANBAN or LIFECYCLE
     * @returns {Promise<any>} Status OK or REJECTED and a list of widgets if rejected.
     */
    async changeCurrentStep(schemaId: string, entityId: string, stepId: string, source?: 'KANBAN' | 'LIFECYCLE') {
        return await this.invokeApiWithErrorHandling<{
            status: 'OK' | 'REJECTED';
            widgets: Widget[];
        }>(`/${schemaId}/${entityId}/switchToStep`, 'POST', { stepId, source });
    }

    /**
     * TODO: Please comment this method
     * @param maxCount
     * @param archived
     * @param inactive
     */
    async fetchPhaseStatistics(maxCount: number = 50, archived = true, inactive = true) {
        return await this.invokeApiWithErrorHandling(`/phases/stats`, 'GET', undefined, {
            queryParams: {
                archived,
                inactive,
                size: maxCount,
            },
        });
    }

    /**
     * TODO: Please comment this method
     */
    async fetchTotalCommissionForAllPhases() {
        return await this.invokeApiWithErrorHandling(`/calculateTotalCommissionForAllPhases`, 'GET');
    }

    /**
     * TODO: Please comment this method
     * @param entities
     */
    async fetchCurrentPhaseOfSomeEntities(entities: EntityQuery[]) {
        return await this.invokeApiWithErrorHandling<EntityPhaseInformation[]>(`/phases`, 'POST', entities);
    }

    /**
     * TODO: Please comment this method
     * @param schemaId
     * @param entityId
     */
    async fetchAllPhasesForEstate(schemaId: string, entityId: string) {
        return await this.invokeApiWithErrorHandling<Phase[]>(`/${schemaId}/${entityId}/phases`, 'GET');
    }

    /**
     * TODO: Please comment this method
     * @param stepId
     * @param schemaId
     * @param entityId
     */
    async validateStep(stepId: string, schemaId: string, entityId: string) {
        return await this.invokeApiWithErrorHandling(`/validateStep/stepId/${stepId}/schemaId/${schemaId}/entityId/${entityId}`, 'POST');
    }

    /**
     * TODO: Please comment this method
     * @param schemaId
     * @param entityId
     */
    async deleteEntityInformation(schemaId: string, entityId: string) {
        return await this.invokeApiWithErrorHandling(`/steps/${schemaId}/${entityId}`, 'DELETE');
    }

    /**
     * TODO: Please comment this method
     */
    async fetchConfigurations() {
        return await this.invokeApiWithErrorHandling('/phaseconfigurations', 'GET');
    }

    /**
     * TODO: Please comment this method
     * @param phaseConfigurationInformation
     */
    async saveOrUpdateConfiguration(phaseConfigurationInformation: PhaseConfigurationInformation) {
        return await this.invokeApiWithErrorHandling('/phaseconfigurations', 'POST', phaseConfigurationInformation);
    }

    /**
     * TODO: Please comment this method
     * @param id
     */
    async deleteCustomConfiguration(id: string) {
        return await this.invokeApiWithErrorHandling(`/phaseconfigurations/${id}`, 'DELETE');
    }
}
