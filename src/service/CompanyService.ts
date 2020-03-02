import { Company, CompanyGroup, LegislationText } from '@flowfact/types';
import { AxiosResponse } from 'axios';
import { APIClient, APIMapping } from '../http';
import { OwnerClass } from '@flowfact/types';

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

    /**
     * Gets the details of a company group.
     */
    async fetchGroup(name: string) {
        return this.invokeApi<CompanyGroup>(`/internal/company/groups/${name}`);
    }

    /**
     * This ressource is used for setting the ownerClass of a company.
     * @param {string} companyId - The companyId of the company that should be updated
     * @param {OwnerClass} ownerClass - The OwnerClass that the company should get. Values: "INTERNAL/CUSTOMER/EXTERNAL_DEVELOPER"
     * @returns {Promise<AxiosResponse>}
     */
    async setOwnerClassForCompany(companyId: string, ownerClass: OwnerClass) {
        return this.invokeApi(`/company/${companyId}/ownerclass/${ownerClass}`, 'PUT');
    }
}

export default new CompanyService();
