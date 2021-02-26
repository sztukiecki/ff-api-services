import axios, { AxiosResponse } from 'axios';
import { APIClient, APIMapping } from '../../http';
import { CaasManagementServiceTypes } from './CaasManagementService.Types';

export class CaasManagementController extends APIClient {
    constructor() {
        super(APIMapping.caasManamgentService);
    }

    /* ############ Projects ############ */

    /**
     * Fetches all projects
     */
    async fetchAllProjects() {
        return this.invokeApiWithErrorHandling<CaasManagementServiceTypes.GetAllProjectsResponse>('/projects', 'GET');
    }

    /**
     * Fetches the project with the given id
     * @param id
     */
    async fetchProject(id: string) {
        return this.invokeApiWithErrorHandling<CaasManagementServiceTypes.Project>(`/projects/${id}`, 'GET');
    }

    /**
     * Creates a project with the given configuration
     * @param projectConfiguration
     */
    async createProject(projectConfiguration: CaasManagementServiceTypes.ProjectCreate) {
        return this.invokeApiWithErrorHandling<CaasManagementServiceTypes.Project>('/projects', 'POST', projectConfiguration);
    }

    /**
     * Deletes the project with the given id
     * @param id
     */
    async deleteProject(id: string) {
        return this.invokeApiWithErrorHandling(`/projects/${id}`, 'DELETE');
    }

    /* ############ Containers ############ */

    /**
     * Fetches all containers in their short representation
     */
    async fetchAllContainers() {
        return this.invokeApiWithErrorHandling<CaasManagementServiceTypes.GetAllContainersResponse>('/containers', 'GET');
    }

    /**
     * Fetches the container with the given id
     * @param id
     */
    async fetchContainer(id: string) {
        return this.invokeApiWithErrorHandling<CaasManagementServiceTypes.Container>(`/containers/${id}`, 'GET');
    }

    /**
     * Fetches the logs for the container with the given id
     * @param id
     */
    async fetchContainerLogs(id: string) {
        return this.invokeApiWithErrorHandling<CaasManagementServiceTypes.ContainerLogsResponse>(`/containers/${id}/logs`, 'GET');
    }

    /**
     * Creates a container with the given configuration
     * @param containerConfiguration
     */
    async createContainer(containerConfiguration: CaasManagementServiceTypes.ContainerCreate) {
        return this.invokeApiWithErrorHandling<CaasManagementServiceTypes.Container>('/containers', 'POST', containerConfiguration);
    }

    /**
     * Updates the container with the given id and configuration
     * @param id
     * @param containerConfiguration
     */
    async updateContainer(id: string, containerConfiguration: CaasManagementServiceTypes.ContainerDetails) {
        return this.invokeApiWithErrorHandling<CaasManagementServiceTypes.Container>(`/containers/${id}`, 'PUT', containerConfiguration);
    }

    /**
     * Deletes the container with the given id
     * @param id
     */
    async deleteContainer(id: string) {
        return this.invokeApiWithErrorHandling(`/containers/${id}`, 'DELETE');
    }

    /**
     * Gets the current default domain of the container
     * @param id
     */
    async fetchContainerDefaultDomain(id: string) {
        return this.invokeApiWithErrorHandling<CaasManagementServiceTypes.GetContainerDefaultDomainResponse>(`/containers/${id}/default-domain`, 'GET');
    }

    /**
     * Gets the current default domain of the container
     * @param id
     */
    async updateContainerDefaultDomain(id: string, domain: string) {
        return this.invokeApiWithErrorHandling<CaasManagementServiceTypes.GetContainerDefaultDomainResponse>(`/containers/${id}/default-domain`, 'PUT', {
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
        return this.invokeApiWithErrorHandling<CaasManagementServiceTypes.NiceNameAvailableResponse>(`/containers/nice-name-available?value=${niceName}`, 'GET');
    }

    /* ############ Databases ############ */

    /**
     * Fetches all databases
     */
    async fetchAllDatabases() {
        return this.invokeApiWithErrorHandling<CaasManagementServiceTypes.GetAllDatabasesResponse>('/databases', 'GET');
    }

    /**
     * Fetches the database with the given id
     * @param id
     */
    async fetchDatabase(id: string) {
        return this.invokeApiWithErrorHandling<CaasManagementServiceTypes.Database>(`/databases/${id}`, 'GET');
    }

    /**
     * Creates a database with the given configuration
     * @param databaseConfiguration
     */
    async createDatabase(databaseConfiguration: CaasManagementServiceTypes.DatabaseCreate) {
        return this.invokeApiWithErrorHandling<CaasManagementServiceTypes.Database>('/databases', 'POST', databaseConfiguration);
    }

    /**
     * Deletes the database with the given id
     * @param id
     */
    async deleteDatabase(id: string) {
        return this.invokeApiWithErrorHandling(`/databases/${id}`, 'DELETE');
    }
}