import {APIClient, APIMapping} from '../http';
import {AxiosResponse} from "axios";

export interface PortalAuthenticationModel {
    callbackUrl: string
}

export interface PublishRequest {
    portalId: string,
    entries: PublishRequestEntry[]
}

export interface PublishRequestEntry {
    entityId: string,
    externalId?: string,
    targetStatus: 'OFFLINE' | 'ONLINE'
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

    fetchPublishedOn(entityId: string): Promise<AxiosResponse> {
        return this.invokeApi(`/estates/${entityId}/portals`, 'GET');
    }

    createPortal(portalType: string): Promise<AxiosResponse> {
        return this.invokeApi(`/portals/create/${portalType}`, 'POST', undefined, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    updatePortal(portalId: string, portal: object): Promise<AxiosResponse> {
        return this.invokeApi(`/portals/${portalId}`, 'PATCH', portal);
    }

    deletePortal(portalId: string): Promise<AxiosResponse> {
        return this.invokeApi(`/portals/${portalId}`, 'DELETE');
    }

    authenticatePortal(portalId: string, portalAuthenticationModel: PortalAuthenticationModel) {
        return this.invokeApi(`/portals/${portalId}/authenticate`, 'POST', portalAuthenticationModel)
    }

    publishEstates(publishRequest: PublishRequest): Promise<AxiosResponse> {
        return this.invokeApi('/publish', 'POST', publishRequest);
    }

    /**
     * Fetches the information on which portal a estate is published on.
     * @param estateId
     */
    fetchPublishInformation(estateId: string): Promise<AxiosResponse> {
        return this.invokeApi(`/estates/${estateId}/portals`, 'GET');
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