import HttpClient, {APIMapping} from 'http';


export default class SearchService {

    constructor() {
        this.client = new HttpClient(APIMapping.searchService);
    }

    search(query, index) {
        if (typeof query === 'string') {
            query = JSON.parse(query);
        }
        return this.client.makeRequetSimple(query, '/index/' + index, 'POST');
    }
}
