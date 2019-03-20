import { APIClient } from '../http';
import APIMapping from '../http/APIMapping';
import { AxiosResponse } from 'axios';
import { SendInteractiveExposeModel } from './InteractiveExposeService';

export interface InteractiveExposeDeliveryPreferenceModel {
    emailText: string;
}

export interface InteractiveExposeDeliveryModel {
    exposes: SendInteractiveExposeModel[];
    preferences: InteractiveExposeDeliveryPreferenceModel;
}

export class InteractiveExposeDeliveryService extends APIClient {

    constructor() {
        super(APIMapping.interactiveExposeDeliveryService);
    }

    /**
     * TODO: Please comment this method
     * @param model
     */
    async sendInteractiveExposes(model: SendInteractiveExposeModel[]): Promise<AxiosResponse> {
        return await this.invokeApi('/interactiveExposes', 'POST', model);
    }

    /**
     * TODO: Please comment this method
     * @param model
     */
    async sendInteractiveExposesV2(model: InteractiveExposeDeliveryModel) {
        return await this.invokeApi('/interactiveExposes/send', 'POST', model);
    }

    /**
     * TODO: Please comment this method
     * @param requestId
     */
    async fetchSendingStatus(requestId: string): Promise<AxiosResponse> {
        return await this.invokeApi(`/interactiveExposes/status/${requestId}`, 'GET');
    }
}

export default new InteractiveExposeDeliveryService();
