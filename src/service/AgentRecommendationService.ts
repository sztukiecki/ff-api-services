import {APIClient, APIMapping} from '../http';

export class AgentRecommendationService extends APIClient {

    constructor() {
        super(APIMapping.agentRecommendationService);
    }

    getViewForAgent(schemaId: string, entityId: string) {
        return this.invokeApi(`/agent/schema/${schemaId}/entity/${entityId}`, 'GET').then(s => s.data);
    }

    uploadAgentVideo(schemaId: string, entityId: string, file: any) {
        let formData = new FormData();
        formData.append('file', file);
        return this.invokeApi(`/agent/upload/schema/${schemaId}/entity/${entityId}`, 'POST', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(s => s.data);
    }

    uploadRaterVideo(schemaId: string, entityId: string, file: any, token: string) {
        let formData = new FormData();
        formData.append('file', file);
        return this.invokeApi(`/public/authenticated/upload/schema/${schemaId}/entity/${entityId}?accessToken=${token}`, 'POST', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(s => s.data);
    }


    getViewForRater(token: string) {
        return this.invokeApi(`/public/authenticated/getViewForProspect?accessToken=${token}`, 'GET').then(s => s.data);
    }

    getCompanyAndUser(token: string) {
        return this.invokeApi(`/public/authenticated/companyAndUser?accessToken=${token}`, 'GET').then(s => s.data);
    }

    updateFieldWithSpecificValue(field: string, value: any, token: string) {
        return this.invokeApi(`/public/authenticated/updateFieldWithSpecificValue/${field}?accessToken=${token}`, 'PATCH', value).then(s => s.data);
    }
}

export default new AgentRecommendationService();
