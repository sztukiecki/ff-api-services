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

    fetchEntitiesInPhase(schemaId: string, phaseName: string): Promise<AxiosResponse<string[]>> {
        return this.invokeApi(`/${schemaId}/phases/${phaseName}/entities`, 'GET');
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
}

export default new PropertyMarketingPhaseService();


// property-marketing-phase-service
