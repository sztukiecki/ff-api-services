import {UserTokenManagementController} from './UserTokenManagementController';
import {StatusController} from './StatusController';

export * from './ImportPreparationService.Types';

export class ImportPreparationService {

    public readonly userTokenManagement: UserTokenManagementController;
    public readonly status: StatusController;

    constructor() {
        this.userTokenManagement = new UserTokenManagementController();
        this.status = new StatusController();
    }
}


export const ImportPreparationServiceInstance = new ImportPreparationService();