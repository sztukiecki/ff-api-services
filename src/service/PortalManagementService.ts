import {APIClient, APIMapping} from '../http';
import {AxiosResponse} from "axios";

export interface PortalAuthenticationModel {
    callbackUrl: string
}

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

    createPortal(portalType: string): Promise<AxiosResponse> {
        return this.invokeApi(`/portals/create/${portalType}`, 'POST');
    }

    authenticatePortal(portalId: string, portalAuthenticationModel: PortalAuthenticationModel) {
        return this.invokeApi(`/portals/${portalId}/authenticate`, 'POST', portalAuthenticationModel)
    }

    is24AuthenticationCallback(portalId: string, verifier: string, token: string, state: string): Promise<AxiosResponse> {
        return this.invokeApi(`/portals/is24/authenticate/${portalId}/callback`, 'GET', undefined, {
            queryParams: {
                oauth_verifier: verifier,
                oauth_token: token,
                state: state
            }
        })
    }
}

export default new PortalManagementService();