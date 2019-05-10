import {
    ContainerCreate,
    ContainerLogsResponse,
    ContainerResponse,
    ContainerDetails,
    Database,
    DatabaseCreate,
    GetAllContainersResponse,
    GetAllDatabasesResponse,
    GetAllProjectsResponse,
    Project,
    ProjectCreate,
} from '@flowfact/types';
import { AxiosResponse } from 'axios';
import APIClient from '../http/APIClient';
import APIMapping from '../http/APIMapping';

export class CaasManagementService extends APIClient {

    constructor() {
        super(APIMapping.caasManamgentService);
    }

    /* ############ Projects ############ */

    /**
     * Fetches all projects
     * @return {GetAllProjectsResponse}
     */
    async fetchAllProjects(): Promise<AxiosResponse<GetAllProjectsResponse>> {
        return await this.invokeApi('/projects', 'GET');
    }

    /**
     * Fetches the project with the given id
     * @param id
     * @return {Project}
     */
    async fetchProject(id: string): Promise<AxiosResponse<Project>> {
        return await this.invokeApi(`/projects/${id}`, 'GET');
    }

    /**
     * Creates a project with the given configuration
     * @param projectConfiguration
     * @return {Project}
     */
    async createProject(projectConfiguration: ProjectCreate): Promise<AxiosResponse<Project>> {
        return await this.invokeApi('/projects', 'POST', projectConfiguration);
    }

    /**
     * Deletes the project with the given id
     * @param id
     */
    async deleteProject(id: string): Promise<AxiosResponse> {
        return await this.invokeApi(`/projects/${id}`, 'DELETE');
    }

    /* ############ Containers ############ */

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
    async createContainer(containerConfiguration: ContainerCreate): Promise<AxiosResponse<ContainerResponse>> {
        return await this.invokeApi('/containers', 'POST', containerConfiguration);
    }

    /**
     * Updates the container with the given id and configuration
     * @param id
     * @param containerConfiguration
     * @return {ContainerResponse}
     */
    async updateContainer(id: string, containerConfiguration: ContainerDetails): Promise<AxiosResponse<ContainerResponse>> {
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

    /**
     * Fetches all databases
     * @return {GetAllDatabasesResponse}
     */
    async fetchAllDatabases(): Promise<AxiosResponse<GetAllDatabasesResponse>> {
        return await this.invokeApi('/databases', 'GET');
    }

    /**
     * Fetches the database with the given id
     * @param id
     * @return {Database}
     */
    async fetchDatabase(id: string): Promise<AxiosResponse<Database>> {
        return await this.invokeApi(`/databases/${id}`, 'GET');
    }

    /**
     * Creates a database with the given configuration
     * @param databaseConfiguration
     * @return {Database}
     */
    async createDatabase(databaseConfiguration: DatabaseCreate): Promise<AxiosResponse<Database>> {
        return await this.invokeApi('/databases', 'POST', databaseConfiguration);
    }

    /**
     * Deletes the database with the given id
     * @param id
     */
    async deleteDatabase(id: string): Promise<AxiosResponse> {
        return await this.invokeApi(`/databases/${id}`, 'DELETE');
    }
}

export default new CaasManagementService();