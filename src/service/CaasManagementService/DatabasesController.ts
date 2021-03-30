import { APIClient, APIMapping } from '../../http';
import { CaasManagementServiceTypes } from './CaasManagementService.Types';

export class DatabasesController extends APIClient {
    constructor() {
        super(APIMapping.caasManamgentService);
    }

    /**
     * Fetches all databases
     */
    async fetchAll() {
        return this.invokeApiWithErrorHandling<CaasManagementServiceTypes.Database.GetAllResponse>('/databases', 'GET');
    }

    /**
     * Fetches the database with the given id
     * @param id
     */
    async fetch(id: string) {
        return this.invokeApiWithErrorHandling<CaasManagementServiceTypes.Database.Database>(`/databases/${id}`, 'GET');
    }

    /**
     * Creates a database with the given configuration
     * @param databaseConfiguration
     */
    async create(databaseConfiguration: CaasManagementServiceTypes.Database.Create) {
        return this.invokeApiWithErrorHandling<CaasManagementServiceTypes.Database.Database>('/databases', 'POST', databaseConfiguration);
    }

    /**
     * Deletes the database with the given id
     * @param id
     */
    async delete(id: string) {
        return this.invokeApiWithErrorHandling(`/databases/${id}`, 'DELETE');
    }
}
