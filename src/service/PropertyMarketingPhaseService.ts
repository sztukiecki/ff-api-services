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

    updateCurrentPhase(schemaId: string, entityId: string, name: string): Promise<AxiosResponse> {
        return this.invokeApi(`/${schemaId}/${entityId}/currentPhase`, 'POST', {
            name: name
        });
    }
}

export default new PropertyMarketingPhaseService();


// property-marketing-phase-service
