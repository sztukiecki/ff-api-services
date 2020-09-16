import { APIClient, APIMapping } from '../../http';
import { ImportPreparationServiceTypes } from './ImportPreparationService.Types';
import TableDependency = ImportPreparationServiceTypes.TableDependency;

export class TableDependenciesController extends APIClient {
    constructor() {
        super(APIMapping.importPreparationService);
    }

    /**
     * Gets all ( when sourceSystem = '' ) or specific table dependencies
     */
    async fetch(sourceSystem: string = 'performer') {
        return await this.invokeApiWithErrorHandling<TableDependency[]>('/table-dependencies', 'GET', undefined, {
            queryParams: {
                sourceSystem,
            },
        });
    }

    /**
     * get all deps for "my" current system
     */
    async fetchMySystem() {
        return await this.invokeApiWithErrorHandling<TableDependency[]>('/table-dependencies/my-system', 'GET');
    }
}
