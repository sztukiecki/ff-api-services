import { AxiosResponse } from 'axios';
import { APIClient, APIMapping } from '../http';

export class CsvToEntityImporterService extends APIClient {
    constructor() {
        super(APIMapping.csvToEntityImporterService);
    }

    async uploadCsvFile(file: FormData, targetSchema: string, delimiter: string = ','): Promise<AxiosResponse> {
        return (await this.invokeApi(`/upload?targetSchema=${targetSchema}&delimiter=${delimiter}`, 'POST', file)).data;
    }
}

export default new CsvToEntityImporterService();
