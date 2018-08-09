import {APIClient, APIMapping} from '../http';
import {AxiosResponse} from "axios";

export class PortalManagementService extends APIClient {

    constructor() {
        super(APIMapping.portalManagementService);
    }

    fetchPortals(): Promise<AxiosResponse> {
        return this.invokeApi('/portals', 'GET');
    }

    fetchPortal(portalId: string): Promise<AxiosResponse> {
        return this.invokeApi(`/portals/${portalId}`, 'GET');
    }

    fetchPortalTypes(): Promise<AxiosResponse> {
        return this.invokeApi('/portalTypes', 'GET');
    }

    registerPortal(portalType: 'IS24' | 'OPEN_IMMO'): Promise<AxiosResponse> {
        return this.invokeApi('/portals/register', 'POST', {
            portalType: portalType
        });
    }
}

export default new PortalManagementService();