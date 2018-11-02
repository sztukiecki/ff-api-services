import {APIClient, APIMapping} from '../http';
import {AxiosResponse} from "axios";
import { EntityQuery, PhaseName } from '../util/InternalTypes';

export interface EntityPhaseInformation {
    entityId: string;
    schemaId: string;
    phaseName: PhaseName;
}

export class PropertyMarketingPhaseService extends APIClient {

    constructor() {
        super(APIMapping.propertyMarketingPhaseService);
    }

    fetchPhases(schemaId: string): Promise<AxiosResponse> {
        return this.invokeApi(`/${schemaId}/phases`, 'GET');
    }

    fetchPhase(schemaId: string, phaseName: string): Promise<AxiosResponse> {
        return this.invokeApi(`/${schemaId}/phases/${phaseName}`, 'GET');
    }

    fetchEntitiesInPhase(phaseName: string): Promise<AxiosResponse<string[]>> {
        return this.invokeApi(`/phases/${phaseName}/entities`, 'GET', undefined, {
            queryParams: {
                archived: 'true',
                inactive: 'true'
            }
        });
    }

    fetchEntitiesInPhaseAndSchema(phaseName: string, schemaId: string): Promise<AxiosResponse<string[]>> {
        return this.invokeApi(`/phases/${phaseName}/entities/${schemaId}`, 'GET', undefined, {
            queryParams: {
                archived: 'true',
                inactive: 'true'
            }
        });
    }

    fetchCurrentPhase(schemaId: string, entityId: string): Promise<AxiosResponse> {
        return this.invokeApi(`/${schemaId}/${entityId}/currentPhase`, 'GET');
    }

    updateStep(schemaId: string, entityId: string, stepId: string, completed: boolean): Promise<AxiosResponse> {
        return this.invokeApi(`/${schemaId}/${entityId}/updateStep`, 'POST', {
            stepId: stepId,
            completed: completed
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
    changeCurrentStep(schemaId: string, entityId: string, stepId: string, source?: string): Promise<AxiosResponse> {
        return this.invokeApi(`/${schemaId}/${entityId}/switchToStep`, 'POST', { stepId, source });
    }

    fetchPhaseStatistics(): Promise<AxiosResponse> {
        return this.invokeApi(`/phases/stats`, 'GET', undefined, {
            queryParams: {
                archived: 'true',
                inactive: 'true'
            }
        });
    }

    fetchTotalCommissionForAllPhases(): Promise<AxiosResponse> {
        return this.invokeApi(`/calculateTotalCommissionForAllPhases`, 'GET');
    }

    fetchCurrentPhaseOfSomeEntities(entities: EntityQuery[]): Promise<AxiosResponse<EntityPhaseInformation[]>> {
        return this.invokeApi(`/phases`, 'POST', entities);
    }

    fetchAllPhasesForEstate(schemaId: string, entityId: string) {
        return this.invokeApi(`/${schemaId}/${entityId}/phases`, 'GET');
    }

    validateStep(stepId: string, schemaId: string, entityId: string): Promise<AxiosResponse> {
        return this.invokeApi(`/validateStep/stepId/${stepId}/schemaId/${schemaId}/entityId/${entityId}`, 'POST');
    }
}

export default new PropertyMarketingPhaseService();


// property-marketing-phase-service
