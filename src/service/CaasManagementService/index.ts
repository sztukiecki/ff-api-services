import { ContainersController } from './ContainersController';
import { DatabasesController } from './DatabasesController';
import { ProjectsController } from './ProjectsController';

export * from './CaasManagementService.Types';

export class CaasManagementService {
    public static instance = new CaasManagementService();

    public readonly containers: ContainersController;
    public readonly databases: DatabasesController;
    public readonly projects: ProjectsController;

    constructor() {
        this.containers = new ContainersController();
        this.databases = new DatabasesController();
        this.projects = new ProjectsController();
    }
}

export const CaasManagementServiceInstance = new CaasManagementService();