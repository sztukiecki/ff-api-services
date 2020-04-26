import { APIClient, APIMapping } from '../http';
import { AxiosResponse } from 'axios';

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
        return await this.invokeApi<{ leadImportSetting: LeadImport }>(`/portals/${portalId}`, 'GET');
    }

    /**
     * This method updates the lead import mode.
     * @param portalId
     * @param importMode
     */
    async setImportMode(portalId: string, importMode: LeadImport): Promise<AxiosResponse> {
        return await this.invokeApi<{ leadImportSetting: LeadImport }>(`/portals/${portalId}`, 'PUT', { leadImportSetting: importMode });
    }

}

export default new IS24LeadService();