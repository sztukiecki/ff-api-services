import axios, { AxiosResponse } from 'axios';
import { APIClient, APIMapping } from '../../http';
import { CaasManagementServiceTypes } from './CaasManagementService.Types';

export class ContainerController extends APIClient {
    constructor() {
        super(APIMapping.caasManamgentService);
    }

    /**
    * Fetches all containers in their short representation
    */
    async fetchAll() {
        return this.invokeApiWithErrorHandling<CaasManagementServiceTypes.Container.GetAllResponse>('/containers', 'GET');
    }

    /**
     * Fetches the container with the given id
     * @param id
     */
    async fetch(id: string) {
        return this.invokeApiWithErrorHandling<CaasManagementServiceTypes.Container.Container>(`/containers/${id}`, 'GET');
    }

    /**
     * Fetches the logs for the container with the given id
     * @param id
     */
    async fetchLogs(id: string) {
        return this.invokeApiWithErrorHandling<CaasManagementServiceTypes.Container.LogsResponse>(`/containers/${id}/logs`, 'GET');
    }

    /**
     * Creates a container with the given configuration
     * @param containerConfiguration
     */
    async create(containerConfiguration: CaasManagementServiceTypes.Container.Create) {
        return this.invokeApiWithErrorHandling<CaasManagementServiceTypes.Container.Container>('/containers', 'POST', containerConfiguration);
    }

    /**
     * Updates the container with the given id and configuration
     * @param id
     * @param containerConfiguration
     */
    async update(id: string, containerConfiguration: CaasManagementServiceTypes.Container.Details) {
        return this.invokeApiWithErrorHandling<CaasManagementServiceTypes.Container.Container>(`/containers/${id}`, 'PUT', containerConfiguration);
    }

    /**
     * Deletes the container with the given id
     * @param id
     */
    async delete(id: string) {
        return this.invokeApiWithErrorHandling(`/containers/${id}`, 'DELETE');
    }

    /**
     * Gets the current default domain of the container
     * @param id
     */
    async fetchDefaultDomain(id: string) {
        return this.invokeApiWithErrorHandling<CaasManagementServiceTypes.Container.GetDefaultDomainResponse>(`/containers/${id}/default-domain`, 'GET');
    }

    /**
     * Gets the current default domain of the container
     * @param id
     */
    async updateDefaultDomain(id: string, domain: string) {
        return this.invokeApiWithErrorHandling<CaasManagementServiceTypes.Container.GetDefaultDomainResponse>(`/containers/${id}/default-domain`, 'PUT', {
            containerId: id,
            defaultDomain: domain
        });
    }

    /**
     * GETs the given url and returns the respose
     * @param url
     */
    async pingUrl(url: string): Promise<AxiosResponse> {
        return axios.get(url);
    }

    /**
     * Checks whether the nice name is available (globally unique)
     * @param niceName
     */
    async isNiceNameAvailable(niceName: string) {
        return this.invokeApiWithErrorHandling<CaasManagementServiceTypes.Container.NiceNameAvailableResponse>(`/containers/nice-name-available?value=${niceName}`, 'GET');
    }
}