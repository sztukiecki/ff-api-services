import { AxiosResponse } from 'axios';
import APIClient from '../http/APIClient';
import APIMapping from '../http/APIMapping';
import {
    ContainerCreateModel,
    ContainerLogsResponse,
    ContainerResponse,
    ContainerUpdateModel, GetAllContainersResponse
} from '../models/Container';

export class CaasManagementService extends APIClient {

    constructor() {
        super(APIMapping.caasManamgentService);
    }

    /**
     * Fetches all containers in their short representation
     * @return {GetAllContainersResponse}
     */
    async fetchAllContainers(): Promise<AxiosResponse<GetAllContainersResponse>> {
        return await this.invokeApi('/containers', 'GET');
    }

    /**
     * Fetches the container with the given id
     * @param id
     * @return {ContainerResponse}
     */
    async fetchContainer(id: string): Promise<AxiosResponse<ContainerResponse>> {
        return await this.invokeApi(`/containers/${id}`, 'GET');
    }

    /**
     * Fetches the logs for the container with the given id
     * @param id
     * @return {ContainerLogsResponse}
     */
    async fetchContainerLogs(id: string): Promise<AxiosResponse<ContainerLogsResponse>> {
        return await this.invokeApi(`/containers/${id}/logs`, 'GET');
    }

    /**
     * Creates a container with the given configuration
     * @param containerConfiguration
     * @return {ContainerResponse}
     */
    async createContainer(containerConfiguration: ContainerCreateModel): Promise<AxiosResponse<ContainerResponse>> {
        return await this.invokeApi('/containers', 'POST', containerConfiguration);
    }

    /**
     * Updates the container with the given id and configuration
     * @param id
     * @param containerConfiguration
     * @return {ContainerResponse}
     */
    async updateContainer(id: string, containerConfiguration: ContainerUpdateModel): Promise<AxiosResponse<ContainerResponse>> {
        return await this.invokeApi(`/containers/${id}`, 'PUT', containerConfiguration);
    }

    /**
     * Deletes the container with the given id
     * @param id
     */
    async deleteContainer(id: string): Promise<AxiosResponse> {
        return await this.invokeApi(`/containers/${id}`, 'DELETE');
    }

    /* ############ Databases ############ */
    // TODO: This section is WIP

    /**
     * Fetches all databases
     */
    async fetchAllDatabases(): Promise<AxiosResponse> {
        return await this.invokeApi('/databases', 'GET');
    }

}

export default new CaasManagementService();
