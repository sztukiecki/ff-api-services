import { APIClient, APIMapping } from '../../http';
import { CompanyServiceTypes } from './CompanyService.Types';

export class LegislationTextController extends APIClient {
    constructor() {
        super(APIMapping.companyService);
    }

    /**
     * Get all legislations texts from the currently logged in company
     */

    async fetchLegislationTexts() {
        return this.invokeApiWithErrorHandling<CompanyServiceTypes.LegislationText[]>('/legislationTexts', 'GET');
    }

    /**
     * get all legislations texts for a specific company
     */
    async fetchLegislationTextsByCompanyId(companyId: CompanyServiceTypes.ID) {
        return this.invokeApiWithErrorHandling<CompanyServiceTypes.LegislationText[]>('/public/legislationTexts', 'GET', undefined, {
            queryParams: {
                companyId: companyId,
            },
        });
    }

    /**
     * Updates one legislation text and if it does not exists, then it will create it
     */
    async createOrUpdateLegislationText(legislationText: CompanyServiceTypes.LegislationText) {
        return this.invokeApiWithErrorHandling<CompanyServiceTypes.Company>('/legislationTexts', 'PUT', legislationText);
    }

    /**
     * Deletes one legislation text of the company
     */
    async deleteLegislationText(id: string) {
        return this.invokeApiWithErrorHandling<CompanyServiceTypes.Company>(`/legislationTexts/${id}`, 'DELETE');
    }

    /**
     * Gets the currently valid consent text that the user must accept before we put our example legislation texts into his or her system.
     * Thats because we do not want to hold the text in the client, but in the service so the customer has no chance to modify it.
     */
    async fetchCurrentlyValidConsentText() {
        return this.invokeApiWithErrorHandling<string>('/legislationTexts/consentText', 'GET');
    }

    /**
     * Restore default legislation texts of the company.
     * Other texts then the ones from FLOWFACT will not be modified.
     */
    async restoreDefaults() {
        return this.invokeApiWithErrorHandling<CompanyServiceTypes.Company>('/legislationTexts/restoreDefaults', 'PUT', undefined, {
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
