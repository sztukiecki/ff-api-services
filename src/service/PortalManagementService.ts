import {APIClient, APIMapping} from '../http';
import {AxiosResponse} from "axios";

export class PortalManagementService extends APIClient {

    constructor() {
        super(APIMapping.portalManagementService);
    }

    fetchPortalTypes(): Promise<AxiosResponse> {
        return this.invokeApi('/portalTypes', 'GET');
    }

}

export default new PortalManagementService();