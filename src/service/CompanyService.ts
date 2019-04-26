import { Company, LegislationText } from '@flowfact/types';
import { AxiosResponse } from 'axios';
import { APIClient, APIMapping } from '../http';

export class CompanyService extends APIClient {

    constructor() {
        super(APIMapping.companyService);
    }

    /**
     * domain -> can also be an email
     * @param companyName
     * @param companyUrl
     * @param domain
     */
    async createCompany(companyName: string, companyUrl: string, domain: string): Promise<AxiosResponse> {
        return this.invokeApi('/company', 'POST', {
            companyName,
            companyUrl,
            domain,
        });
    }

    /**
     * TODO: Please comment this method
     * @param presets
     */
    async usePreset(presets: any) {
        return this.invokeApi('/company/usepreset', 'PUT', {
            presets,
        });
    }

    /**
     * TODO: Please comment this method
     * @param companyId
     */
    async startTrial(companyId: string) {
        return this.invokeApi(`/internal/company/${companyId}/startTrial`, 'PUT');
    }

    /**
     * TODO: Please comment this method
     * @param companyId
     */
    async endTrial(companyId: string) {
        return this.invokeApi(`/internal/company/${companyId}/endTrial`, 'PUT');
    }

    /**
     * Update a company
     * @param body
     */
    async updateCompany(body: Company) {
        return this.invokeApi('/company', 'PUT', body);
    }

    /**
     * Find a company by id and return it.
     * @param companyId
     */
    async findCompany(companyId: string): Promise<AxiosResponse<Company>> {
        return this.invokeApi(`/company/${encodeURIComponent(companyId)}`, 'GET');
    }

    /**
     * TODO: Please comment this method
     * @param mailaddress
     */
    async memberCountByEMailAddress(mailaddress: string) {
        return this.invokeApi('/company/numberOfUsers', 'PUT', {
            mailaddress: mailaddress,
        });
    }

    /**
     * TODO: Please comment this method
     * @param image
     */
    async postImage(image: any) {
        const formData = new FormData();
        formData.append('logo', image);
        return this.invokeApi('/company/logo', 'POST', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    }

    /**
     * TODO: Please comment this method
     * @param terms
     */
    async postTerms(terms: any) {
        const formData = new FormData();
        formData.append('terms-file', terms);
        return this.invokeApi('/company/terms/upload', 'POST', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    }

    /**
     * TODO: Please comment this method
     * @param fileName
     */
    async removeTerms(fileName: string) {
        const formData = new FormData();
        formData.append('file-name', fileName);
        return this.invokeApi('/company/terms/remove', 'POST', formData);
    }

    /**
     * TODO: Please comment this method
     * @param currentName
     * @param newName
     */
    async renameTerms(currentName: string, newName: string) {
        const formData = new FormData();
        formData.append('current-name', currentName);
        formData.append('new-name', newName);

        return this.invokeApi('/company/terms/rename', 'POST', formData);
    }

    /**
     * Get all legislations texts from the company as JSON
     * @returns {Promise<AxiosResponse>}
     */
    async fetchLegislationTexts(): Promise<AxiosResponse> {
        return this.invokeApi('/legislationTexts', 'GET');
    }

    /**
     * TODO: Please comment this method
     * @param companyId
     */
    async fetchLegislationTextsByCompanyId(companyId: string): Promise<AxiosResponse> {
        return this.invokeApi('/public/legislationTexts', 'GET', undefined, {
            queryParams: {
                companyId: companyId,
            },
        });
    }

    /**
     * Updates one legislation text and if it does not exists, then it will create it
     * @param {LegislationText} legislationText
     * @returns {Promise<AxiosResponse>}
     */
    async createOrUpdateLegislationText(legislationText: LegislationText): Promise<AxiosResponse> {
        return this.invokeApi('/legislationTexts', 'PUT', legislationText);
    }

    /**
     * Deletes one legislation text of the company
     * @param {string} id
     * @returns {Promise<AxiosResponse>}
     */
    async deleteLegislationText(id: string): Promise<AxiosResponse> {
        return this.invokeApi(`/legislationTexts/${id}`, 'DELETE');
    }

    /**
     * Gets the currently valid consent text that the user must accept before we put our example legislation texts into his or her system.
     * Thats because we do not want to hold the text in the client, but in the service so the customer has no chance to modify it.
     */
    async fetchCurrentlyValidConsentText(): Promise<AxiosResponse> {
        return this.invokeApi('/legislationTexts/consentText', 'GET');
    }

    /**
     * Restore default legislation texts of the company.
     * Other texts then the ones from FLOWFACT will not be modified.
     */
    async restoreDefaults(): Promise<AxiosResponse> {
        return this.invokeApi(
            '/legislationTexts/restoreDefaults',
            'PUT',
            undefined,
            {
                headers: { 'Content-Type': 'application/json' },
            });
    }
}

export default new CompanyService();

const StatusMapping = {
    create: {
        ALREADY_EXIST: 400,
        MANDANTORY_FIELD_NOT_FILLED: 422,
        INTERNAL_SERVER_ERROR: 500,
    },
    findByEmail: {
        NO_COMPANY_FOUND: 204,
        INTERNAL_SERVER_ERROR: 500,
    },
    findById: {
        ID_NOT_FOUND: 204,
        INTERNAL_SERVER_ERROR: 500,
    },
};

export {
    StatusMapping,
};
