import {APIClient, APIMapping} from '../http';
import {AxiosResponse} from "axios";

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
        return this.invokeApi(`/public/authenticated/getViewForProspect?accessToken=${token}`, 'GET', undefined, {
            headers: {
                'Accept': 'application/json'
            }
        }).then(s => s.data);
    }

    getCompanyAndUser(token: string) {
        return this.invokeApi(`/public/authenticated/companyAndUser?accessToken=${token}`, 'GET').then(s => s.data);
    }

    updateEntity(fieldValueMapping: object, token: string): Promise<AxiosResponse> {
        return this.invokeApi(`/public/authenticated/updateEntity?accessToken=${token}`, 'PATCH', fieldValueMapping);
    }

    finishRating(token: string, value: any) {
        return this.invokeApi(`/public/authenticated/finishRating?accessToken=${token}`, 'POST', value).then(s => s.data);
    }


    createPreconditions() {
        return this.invokeApi(`/agent/preconditions`, 'POST').then(s => s.data);
    }
}

export default new AgentRecommendationService();
