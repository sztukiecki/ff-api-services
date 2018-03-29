import {APIClient} from "../http";
import APIMapping from "../http/APIMapping";
import {AxiosResponse} from "axios";
import {SendInteractiveExposeModel} from "./InteractiveExposeService";

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

    async sendInteractiveExposes(model: SendInteractiveExposeModel[]): Promise<AxiosResponse> {
        return this.invokeApi('/interactiveExposes', 'POST', model);
    }

    async sendInteractiveExposesV2(model: InteractiveExposeDeliveryModel) {
        return this.invokeApi('/interactiveExposes/send', 'POST', model);
    }

    async fetchSendingStatus(requestId: string): Promise<AxiosResponse> {
        return this.invokeApi(`/interactiveExposes/status/${requestId}`, 'GET');
    }
}

export default new InteractiveExposeDeliveryService();
