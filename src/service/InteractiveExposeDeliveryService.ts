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
}

export default new InteractiveExposeDeliveryService();
