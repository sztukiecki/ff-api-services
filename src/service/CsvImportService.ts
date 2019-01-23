import { AxiosResponse } from 'axios';
import { APIClient, APIMapping } from '../http';

export class CsvImportService extends APIClient {
	constructor() {
		super(APIMapping.csvImportService);
	}

	async uploadCsvFile(file: FormData, targetSchema: string, delimiter: string = ','): Promise<AxiosResponse> {
		return (await this.invokeApi(`/upload?targetSchema=${targetSchema}&delimiter=${delimiter}`, 'POST', file)).data;
	}
}

export default new CsvImportService();
