import { ContainerController } from './ContainerController';
import { DatabaseController } from './DatabaseController';
import { ProjectController } from './ProjectController';

export * from './CaasManagementService.Types';

export class CaasManagementService {
    public static instance = new CaasManagementService();

    public readonly container: ContainerController;
    public readonly database: DatabaseController;
    public readonly project: ProjectController;

    constructor() {
        this.container = new ContainerController();
        this.database = new DatabaseController();
        this.project = new ProjectController();
    }
}

export const CaasManagementServiceInstance = new CaasManagementService();