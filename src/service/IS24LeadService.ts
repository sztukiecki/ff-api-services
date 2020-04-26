import { APIClient, APIMapping } from '../http';

type LeadImport = 'NONE' | 'ONLY_RECENT' | 'ALL';

export class IS24LeadService extends APIClient {

    constructor() {
        super(APIMapping.is24LeadService);
    }

    /**
     * This method returns the lead import mode.
     * @param portalId
     */
    async getImportMode(portalId: string) {
        return await this.invokeApiWithErrorHandling<{ leadImportSetting: LeadImport }>(`/portals/${portalId}`, 'GET');
    }

    /**
     * This method updates the lead import mode.
     * @param portalId
     * @param importMode
     */
    async setImportMode(portalId: string, importMode: LeadImport) {
        return await this.invokeApiWithErrorHandling(`/portals/${portalId}`, 'PUT', { leadImportSetting: importMode });
    }

}

export default new IS24LeadService();