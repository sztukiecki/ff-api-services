import HttpClient, {APIMapping} from 'http';


export default class EntityExportService {

    constructor() {
        this.client = new HttpClient(APIMapping.entityExportService);
    }

    exportAsCsv(indexName) {
        return this.client.makeRequest({}, '/export/' + indexName, 'GET').then(s => s.data.csv);
    }

}
