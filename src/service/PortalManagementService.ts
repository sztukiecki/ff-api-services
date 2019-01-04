import { AxiosResponse } from 'axios';
import { APIClient, APIMapping } from '../http';

export interface PortalAuthenticationModel {
	callbackUrl: string;
}

export interface PublishRequest {
	portalId: string;
	entries: PublishRequestEntry[];
}

export interface PublishRequestEntry {
	entityId: string;
	externalId?: string;
	targetStatus: 'OFFLINE' | 'ONLINE';
}

export interface Portal {
	companyId?: string;
	description?: string;
	ftpConnectionType?: 'FTP';
	ftpPort?: number;
	ftpServer?: string;
	id?: string;
	loginName?: string;
	logo?: string;
	name?: string;
	password?: string;
	portalKey?: string;
	portalType?: PortalType;
}

export interface PortalEstateSettings {
	id: string;
	portalId: string;
	schemaId: string;
	entityId: string;
	externalId: string;
	showAddress: boolean;
}

export type PortalType = 'IS24' | 'OPENIMMO' | 'WORDPRESS';

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

	fetchPredefinedPortals(): Promise<AxiosResponse> {
		return this.invokeApi('/predefinedPortals', 'GET');
	}

	fetchPortalTypes(): Promise<AxiosResponse> {
		return this.invokeApi('/portalTypes', 'GET');
	}

	fetchPublishedOn(entityId: string): Promise<AxiosResponse> {
		return this.invokeApi(`/estates/${entityId}/portals`, 'GET');
	}

	createPortal(portalType: PortalType, portal: Portal): Promise<AxiosResponse> {
		return this.invokeApi(`/portals/create/${portalType}`, 'POST', portal, {
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	updatePortal(portalId: string, portal: Portal): Promise<AxiosResponse> {
		return this.invokeApi(`/portals/${portalId}`, 'PATCH', portal);
	}

	deletePortal(portalId: string): Promise<AxiosResponse> {
		return this.invokeApi(`/portals/${portalId}`, 'DELETE');
	}

	authenticatePortal(portalId: string, portalAuthenticationModel: PortalAuthenticationModel) {
		return this.invokeApi(`/portals/${portalId}/authenticate`, 'POST', portalAuthenticationModel);
	}

	publishEstates(publishRequest: PublishRequest): Promise<AxiosResponse> {
		return this.invokeApi('/publish', 'POST', publishRequest);
	}

	updatePortalEstateSettings(portalId: string, estateId: string, portalEstateSettings: PortalEstateSettings): Promise<AxiosResponse> {
		return this.invokeApi(`/portals/${portalId}/estates/${estateId}`, 'POST', portalEstateSettings);
	}

	fetchPortalEstateSettings(estateId: string): Promise<AxiosResponse<PortalEstateSettings[]>> {
		return this.invokeApi(`/portals/estates/${estateId}`, 'GET');
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
		});
	}
}

export default new PortalManagementService();