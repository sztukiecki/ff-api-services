import { UserTokenManagementController } from './UserTokenManagementController';
import { StatusController } from './StatusController';
import { TableDependenciesController } from './TableDependenciesController';

export * from './ImportPreparationService.Types';

export class ImportPreparationService {
    public readonly userTokenManagement: UserTokenManagementController;
    public readonly status: StatusController;
    public readonly tableDependencies: TableDependenciesController;

    constructor() {
        this.userTokenManagement = new UserTokenManagementController();
        this.status = new StatusController();
        this.tableDependencies = new TableDependenciesController();
    }
}

export const ImportPreparationServiceInstance = new ImportPreparationService();
