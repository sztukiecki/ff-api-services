import { APIClient, APIMapping } from '../http';
import { AxiosResponse } from 'axios';

class ExcelExporterService extends APIClient {
    constructor() {
        super(APIMapping.excelExporterService);
    }

    /**
     *
     * @param schemaName The SchemaOrGroupName that is used to export the data.
     * @param filterConditions FilterConditions that should be used to define the result more specific
     * @returns A fileId that can be used to check if the process is finished.
     */
    async createExport(schemaName: String, filterConditions: Object): Promise<AxiosResponse> {
        return this.invokeApi(`/export/schema/${schemaName}`, 'POST', {
            target: 'entity',
            conditions: filterConditions,
        });
    }

    /**
     *
     * @param fileId The Id of the file that will be created when the Exporter finished creating the results.
     * @returns The Download-Link of the file.
     */
    async getDownloadLink(fileId: String): Promise<AxiosResponse> {
        return this.invokeApi(`/export/schema/download/${fileId}`, 'GET');
    }

    /**
     *
     * @param searchId The ID of the search entity that contained list view will be exported.
     * @returns A fileId that can be used to check if the process is finished.
     */
    async createSearchExport(searchId: String): Promise<AxiosResponse> {
        return this.invokeApi(`/export/search/${searchId}`, 'POST');
    }

    /**
     *
     * @param fileId The Id of the file that will be created when the Exporter finished creating the results.
     * @returns The Download-Link of the file.
     */
    async getSearchDownloadLink(fileId: String): Promise<AxiosResponse> {
        return this.invokeApi(`/export/search/download/${fileId}`, 'GET');
    }
}

export default new ExcelExporterService();
