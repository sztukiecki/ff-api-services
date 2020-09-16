import { APIClient, APIMapping } from '../http';
import { AxiosResponse } from 'axios';

export class AgentRecommendationService extends APIClient {
    constructor() {
        super(APIMapping.agentRecommendationService);
    }

    /**
     * TODO: Please comment this method
     * @param schemaId
     * @param entityId
     */
    async fetchViewForAgent(schemaId: string, entityId: string): Promise<AxiosResponse> {
        return this.invokeApi(`/agent/schema/${schemaId}/entity/${entityId}`, 'GET');
    }

    /**
     * TODO: Please comment this method
     * @param schemaId
     * @param entityId
     * @param file
     */
    async uploadAgentVideo(schemaId: string, entityId: string, file: any): Promise<AxiosResponse> {
        let formData = new FormData();
        formData.append('file', file);
        return this.invokeApi(`/agent/upload/schema/${schemaId}/entity/${entityId}`, 'POST', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    /**
     * TODO: Please comment this method
     * @param schemaId
     * @param entityId
     * @param file
     * @param token
     */
    async uploadRaterVideo(schemaId: string, entityId: string, file: any, token: string): Promise<AxiosResponse> {
        let formData = new FormData();
        formData.append('file', file);
        return this.invokeApi(`/public/authenticated/upload/schema/${schemaId}/entity/${entityId}?accessToken=${token}`, 'POST', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    /**
     * TODO: Please comment this method
     * @param token
     */
    async fetchViewForRater(token: string): Promise<AxiosResponse> {
        return this.invokeApi(`/public/authenticated/getViewForProspect?accessToken=${token}`, 'GET', undefined, {
            headers: {
                Accept: 'application/json',
            },
        });
    }

    /**
     * TODO: Please comment this method
     * @param token
     */
    async fetchCompanyAndUser(token: string): Promise<AxiosResponse> {
        return this.invokeApi(`/public/authenticated/companyAndUser?accessToken=${token}`, 'GET');
    }

    /**
     * TODO: Please comment this method
     * @param fieldValueMapping
     * @param token
     */
    async updateEntity(fieldValueMapping: object, token: string): Promise<AxiosResponse> {
        return this.invokeApi(`/public/authenticated/updateEntity?accessToken=${token}`, 'PATCH', fieldValueMapping);
    }

    /**
     * TODO: Please comment this method
     * @param token
     * @param value
     */
    async finishRating(token: string, value: any) {
        return this.invokeApi(`/public/authenticated/finishRating?accessToken=${token}`, 'POST', value);
    }

    /**
     * TODO: Please comment this method
     */
    async createPreconditions() {
        return this.invokeApi('/agent/preconditions', 'POST');
    }
}

export default new AgentRecommendationService();
