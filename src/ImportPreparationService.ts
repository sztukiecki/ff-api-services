import { FlowfactImporterStatus, User, UserTokenEntity } from '@flowfact/types';
import { AxiosResponse } from 'axios';
import { APIClient, APIMapping } from './http';

export class ImportPreparationService extends APIClient {

    constructor() {
        super(APIMapping.importPreparationService);
    }

    /**
     * Gets the importer user. If it does not exist, it will be created.
     */
    async getImporterUser(): Promise<AxiosResponse<User>> {
        return await this.invokeApi('/userAndTokenManagement/importerUser', 'GET');
    }

    /**
     * Gets the API token for the importerUser.
     */
    async getImporterToken(importerUserId: string): Promise<AxiosResponse<UserTokenEntity>> {
        return await this.invokeApi(`/userAndTokenManagement/token/importerUser/${importerUserId}`, 'GET');
    }

    /**
     * Creates the API token for the importerUser.
     */
    async createImporterToken(importerUserId: string): Promise<AxiosResponse<UserTokenEntity>> {
        return await this.invokeApi(`/userAndTokenManagement/token/importerUser/${importerUserId}`, 'POST', {});
    }

    /**
     * Gets the status of the currently running import.
     */
    async getImportStatus(): Promise<AxiosResponse<FlowfactImporterStatus>> {
        return await this.invokeApi('/status', 'GET');
    }

}

export default new ImportPreparationService();