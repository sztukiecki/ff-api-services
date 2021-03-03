import { APIClient, APIMapping } from '../../http';
import { CaasManagementServiceTypes } from './CaasManagementService.Types';

export class ProjectsController extends APIClient {
    constructor() {
        super(APIMapping.caasManamgentService);
    }

    /* ############ Projects ############ */

    /**
     * Fetches all projects
     */
    async fetchAll() {
        return this.invokeApiWithErrorHandling<CaasManagementServiceTypes.Project.GetAllResponse>('/projects', 'GET');
    }

    /**
     * Fetches the project with the given id
     * @param id
     */
    async fetch(id: string) {
        return this.invokeApiWithErrorHandling<CaasManagementServiceTypes.Project.Project>(`/projects/${id}`, 'GET');
    }

    /**
     * Creates a project with the given configuration
     * @param projectConfiguration
     */
    async create(projectConfiguration: CaasManagementServiceTypes.Project.Create) {
        return this.invokeApiWithErrorHandling<CaasManagementServiceTypes.Project.Project>('/projects', 'POST', projectConfiguration);
    }

    /**
     * Deletes the project with the given id
     * @param id
     */
    async delete(id: string) {
        return this.invokeApiWithErrorHandling(`/projects/${id}`, 'DELETE');
    }
}