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
        return this.invokeApi(`/phases/${phaseName}/entities`, 'GET');
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

    fetchEntityCountForPhase(phaseName: string): Promise<AxiosResponse> {
        return this.invokeApi(`/phases/${phaseName}/entitiesCount`, 'GET');
    }
}

export default new PropertyMarketingPhaseService();


// property-marketing-phase-service
