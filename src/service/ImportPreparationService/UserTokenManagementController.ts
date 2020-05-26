import {APIClient, APIMapping} from '../../http';
import {User, UserTokenEntity} from '@flowfact/types';

export class UserTokenManagementController extends APIClient {

    constructor() {
        super(APIMapping.importPreparationService);
    }


    /**
     * Gets the importer user. If it does not exist, it will be created.
     */
    async getImporterUser() {
        return this.invokeApiWithErrorHandling<User>('/userAndTokenManagement/importerUser', 'GET');
    }

    /**
     * Gets the API token for the importerUser.
     */
    async getImporterToken(importerUserId: string) {
        return this.invokeApiWithErrorHandling<UserTokenEntity>(`/userAndTokenManagement/token/importerUser/${importerUserId}`, 'GET');
    }

    /**
     * Creates the API token for the importerUser.
     */
    async createImporterToken(importerUserId: string) {
        return this.invokeApiWithErrorHandling<UserTokenEntity>(`/userAndTokenManagement/token/importerUser/${importerUserId}`, 'POST', {});
    }

}
