import HttpClient, {APIMapping} from '../http';

export default class SearchService {

    static client = new HttpClient(APIMapping.searchService);

    static search(query, index, page = 1, size = null) {
        if (typeof query === 'string') {
            query = JSON.parse(query);
        }
        return this.client.makeRequetSimple(query, '/index/' + index, 'POST');
    }

    static filter(index, page = 1, size = null, filter) {
        return this.client.makeRequest({}, '/index/' + index, 'POST', this.getQuery(filter), {
            queryParams: {
                page: page,
                size: size
            }
        });
    }

    static getQuery(filter) {
        if (!filter) {
            return {
                query: {
                    'match_all': {}
                }
            };
        } else {
            return {
                query: {
                    'match_phrase': {
                        _all: filter
                    }
                }
            };
        }
    }
}
