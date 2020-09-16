import { APIClient, APIMapping } from '../../http';
import { IS24LeadServiceTypes } from './IS24LeadService.Types';
import LeadImportMode = IS24LeadServiceTypes.LeadImportMode;

export default class IS24LeadsContoller extends APIClient {
    constructor() {
        super(APIMapping.is24LeadService);
    }

    /**
     * This method returns the lead import mode.
     * @param portalId
     */
    async fetchImportMode(portalId: string) {
        return await this.invokeApiWithErrorHandling<{ leadImportSetting: LeadImportMode }>(`/portals/${portalId}`, 'GET');
    }

    /**
     * This method updates the lead import mode.
     * @param portalId
     * @param importMode
     */
    async updateImportMode(portalId: string, importMode: LeadImportMode) {
        return await this.invokeApiWithErrorHandling(`/portals/${portalId}`, 'PUT', { leadImportSetting: importMode });
    }
}
