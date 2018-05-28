import {APIClient, APIMapping} from '../http';

export class AgentRecommendationService extends APIClient {

    constructor() {
        super(APIMapping.agentRecommendationService);
    }

    getViewForAgent(schemaId: string, entityId: string) {
        return this.invokeApi(`/agent/schema/${schemaId}/entity/${entityId}`, 'GET').then(s => s.data);
    }

    getViewForRater(token: string) {
        return this.invokeApi(`/public/authenticated/getViewForProspect?accessToken=${token}`, 'GET').then(s => s.data);
    }

    updateFieldWithSpecificValue(field: string, value: any, token: string) {
        return this.invokeApi(`/public/authenticated/updateFieldWithSpecificValue/${field}?accessToken=${token}`, 'PATCH', value).then(s => s.data);
    }

}

export default new AgentRecommendationService();
