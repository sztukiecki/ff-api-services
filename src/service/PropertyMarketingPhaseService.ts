import {APIClient, APIMapping} from '../http';
import {AxiosResponse} from "axios";

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
                archived: true,
                inactive: true
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

    changeCurrentStep(schemaId: string, entityId: string, stepId: string): Promise<AxiosResponse> {
        return this.invokeApi(`/${schemaId}/${entityId}/switchToStep`, 'POST', { stepId });
    }

    fetchPhaseStatistics(): Promise<AxiosResponse> {
        return this.invokeApi(`/phases/stats`, 'GET', undefined, {
            queryParams: {
                archived: true,
                inactive: true
            }
        });
    }
}

export default new PropertyMarketingPhaseService();


// property-marketing-phase-service
