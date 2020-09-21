import { APIClient, APIMapping } from '../../http';
import { User, UserTokenEntity } from '@flowfact/types';
import { ImportPreparationServiceTypes } from './ImportPreparationService.Types';
import TokenMapping = ImportPreparationServiceTypes.TokenMapping;

export class UserTokenManagementController extends APIClient {
    constructor() {
        super(APIMapping.importPreparationService);
    }

    /**
     * Gets the importer user. If it does not exist, it will be created.
     */
    async fetchImporterUser() {
        return this.invokeApiWithErrorHandling<User>('/userAndTokenManagement/importerUser', 'GET');
    }

    /**
     * Gets the API token for the importerUser.
     */
    async fetchImporterToken(importerUserId: string) {
        return this.invokeApiWithErrorHandling<UserTokenEntity>(`/userAndTokenManagement/token/importerUser/${importerUserId}`, 'GET');
    }

    /**
     * Creates the API token for the importerUser.
     */
    async createImporterToken(importerUserId: string) {
        return this.invokeApiWithErrorHandling<UserTokenEntity>(`/userAndTokenManagement/token/importerUser/${importerUserId}`, 'POST', {});
    }

    /**
     * Gets the token mapping for given company.
     */
    async fetchTokenMapping(companyId: string) {
        return await this.invokeApiWithErrorHandling<TokenMapping>(`/userAndTokenManagement/token/importerUser/mapping/${companyId}`)
    }
}
