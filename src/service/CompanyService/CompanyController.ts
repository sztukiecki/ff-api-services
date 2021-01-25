import { S3File } from '@flowfact/types';
import { APIClient, APIMapping } from '../../http';
import { CompanyServiceTypes } from './CompanyService.Types';

export class CompanyController extends APIClient {
    constructor() {
        super(APIMapping.companyService);
    }

    /**
     * creates a new company
     * domain -> can also be an email
     * @param companyName
     * @param companyUrl
     * @param domain
     */
    async createCompany(companyName: string, companyUrl: string, domain: string) {
        return this.invokeApiWithErrorHandling<CompanyServiceTypes.ID>('/company', 'POST', {
            companyName,
            companyUrl,
            domain,
        });
    }

    /**
     * Update a company
     * @param body
     */
    async updateCompany(body: CompanyServiceTypes.Company) {
        return this.invokeApiWithErrorHandling('/company', 'PUT', body);
    }

    /**
     * find company by id
     * @param companyId
     */
    async findCompany(companyId: CompanyServiceTypes.ID) {
        return this.invokeApiWithErrorHandling<CompanyServiceTypes.Company>(`/company/${encodeURIComponent(companyId)}`, 'GET');
    }

    /**
     * uploads a new logo for the company
     * @param image
     * @returns file
     */
    async postLogo(image: string | Blob) {
        const formData = new FormData();
        formData.append('logo', image);
        return this.invokeApiWithErrorHandling<S3File>('/company/logo', 'POST', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    }

    /**
     * uploads terms and conditions file for the company
     * @param terms
     */
    async postTerms(terms: string | Blob) {
        const formData = new FormData();
        formData.append('terms-file', terms);
        return this.invokeApiWithErrorHandling<S3File>('/company/terms/upload', 'POST', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    }

    /**
     * remove terms and conditions file
     * @param fileName
     */
    async removeTerms(fileName: string) {
        const formData = new FormData();
        formData.append('file-name', fileName);
        return this.invokeApiWithErrorHandling('/company/terms/remove', 'POST', formData);
    }

    /**
     * rename terms and conditions file
     * @param currentName
     * @param newName
     */
    async renameTerms(currentName: string, newName: string) {
        const formData = new FormData();
        formData.append('current-name', currentName);
        formData.append('new-name', newName);

        return this.invokeApiWithErrorHandling('/company/terms/rename', 'POST', formData);
    }

    /**
     * Upload custom revocation notice file
     * @param revocation
     */
    async postRevocation(revocation: string | Blob) {
        const formData = new FormData();
        formData.append('revocation-file', revocation);
        return this.invokeApiWithErrorHandling('/company/revocation/upload', 'POST', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    }

    /**
     * Remove custom revocation notice file
     * @param fileName
     */
    async removeRevocation(fileName: string) {
        const formData = new FormData();
        formData.append('file-name', fileName);
        return this.invokeApiWithErrorHandling('/company/revocation/remove', 'POST', formData);
    }

    /**
     * This ressource is used for setting the ownerClass of a company.
     * @param {string} companyId - The companyId of the company that should be updated
     * @param {OwnerClass} ownerClass - The OwnerClass that the company should get. Values: "INTERNAL/CUSTOMER/EXTERNAL_DEVELOPER"
     */
    async setOwnerClassForCompany(companyId: CompanyServiceTypes.ID, ownerClass: CompanyServiceTypes.OwnerClass) {
        return this.invokeApiWithErrorHandling(`/company/${companyId}/ownerclass/${ownerClass}`, 'PUT');
    }
}
