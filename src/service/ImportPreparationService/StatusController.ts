import {APIClient, APIMapping} from '../../http';
import {ImportPreparationServiceTypes} from './ImportPreparationService.Types';
import ImporterStatus = ImportPreparationServiceTypes.ImporterStatus;

export class StatusController extends APIClient {

    constructor() {
        super(APIMapping.importPreparationService);
    }


    /**
     * Gets the status of the currently running import.
     */
    async getImportStatus() {
        return await this.invokeApiWithErrorHandling<ImporterStatus>('/status', 'GET');
    }
}
