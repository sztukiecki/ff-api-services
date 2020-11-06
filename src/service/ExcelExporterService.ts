import { APIClient, APIMapping } from '../http';
import { Flowdsl, FlowdslConditionUnion } from '@flowfact/node-flowdsl';

export namespace ExcelExporter {
    export interface ExportFieldType {
        type: string;
        format: string;
        linkedSchema: string;
        options: { [key: string]: string };
    }

    export interface ExportData {
        schemaId: string;
        fileID: string;
        exportEventType: string;
        flowDsl: Flowdsl;
        userDefinedFlowDsl: boolean;
        searchName: string;
        language: string;
        fieldTypes: { [key: string]: ExportFieldType };
    }

    export interface ExportFormatModel {
        type: string;
        format: string;
        unit: string;
        linkedSchema: string;
        options: { [key: string]: string };
    }

    export interface ExportContentModel {
        type: string;
        fieldName: string;
        format: ExportFormatModel;
        contentModels: ExportContentModel[];
    }

    export interface SearchExportViewColumns {
        headerCaption: string;
        contentModels?: ExportContentModel;
    }

    export interface SearchExportData {
        searchId: string;
        fileID: string;
        entityIDList: string;
        exportEventType: string;
        flowDsl: Flowdsl;
        language: string;
        viewColumns: SearchExportViewColumns[];
    }
}

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
    async createExport(schemaName: String, filterConditions: FlowdslConditionUnion | FlowdslConditionUnion[]) {
        return this.invokeApiWithErrorHandling<ExcelExporter.ExportData[]>(`/export/schema/${schemaName}`, 'POST', {
            target: 'entity',
            conditions: filterConditions,
        });
    }

    /**
     *
     * @param fileId The Id of the file that will be created when the Exporter finished creating the results.
     * @returns The Download-Link of the file.
     */
    async fetchDownloadLink(fileId: string) {
        return this.invokeApiWithErrorHandling<string>(`/export/schema/download/${fileId}`, 'GET');
    }

    /**
     *
     * @param searchId The ID of the search entity that contained list view will be exported.
     * @param entityIds Array of ids that should be used to limit the result
     * @returns A fileId that can be used to check if the process is finished.
     */
    async createSearchExport(searchId: string, entityIds: string[] = []) {
        return this.invokeApiWithErrorHandling<ExcelExporter.SearchExportData>(`/export/search/${searchId}`, 'POST', JSON.stringify(entityIds));
    }

    /**
     *
     * @param fileId The Id of the file that will be created when the Exporter finished creating the results.
     * @returns The Download-Link of the file.
     */
    async fetchSearchDownloadLink(fileId: string) {
        return this.invokeApiWithErrorHandling<string>(`/export/search/download/${fileId}`, 'GET');
    }
}

export default new ExcelExporterService();
