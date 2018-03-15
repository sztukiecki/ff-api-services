import {APIClient} from "../http";
import APIMapping from "../http/APIMapping";
import {AxiosResponse} from "axios";
import {SendInteractiveExposeModel} from "./InteractiveExposeService";

export class InteractiveExposeDeliveryService extends APIClient {

    constructor() {
        super(APIMapping.interactiveExposeDeliveryService);
    }

    async sendInteractiveExposes(model: SendInteractiveExposeModel[]): Promise<AxiosResponse> {
        return await this.invokeApi('/interactiveExposes', 'POST', model);
    }

    async fetchSendingStatus(requestId: string): Promise<AxiosResponse> {
        return await this.invokeApi(`/interactiveExposes/status/${requestId}`, 'GET');
    }
}

export default new InteractiveExposeDeliveryService();
