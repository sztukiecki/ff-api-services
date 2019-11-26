import { APIClient, APIMapping } from '../http';
import { AxiosResponse } from 'axios';

export class ExcelExporterService extends APIClient {
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
              conditions: filterConditions
            }
        );
    }

    /**
     *
     * @param fileId The Id of the file that will be created when the Exporter finished creating the results.
     * @returns The Download-Link of the file.
     */
    async getDownloadLink(fileId: String): Promise<AxiosResponse> {
        return this.invokeApi(`/export/schema/download/${fileId}`, 'GET');
    }
}
