import HttpClient, {APIMapping} from '../http';

export default class SearchService {

    static client = new HttpClient(APIMapping.searchService);

    /**
     * Get all searches as short searches. Just the ID and the Name of the search
     * will be returned in a array.
     */
    static getSearches() {
        return this.client.makeRequest({}, '/search', 'GET');
    }

    /**
     * Get the full search information by id.
     * @param searchId
     */
    static getSearch(searchId) {
        return this.client.makeRequest({}, `/search/${searchId}`, 'GET');
    }

    /**
     * Save a search
     * @param searchModel
     * @returns {*}
     */
    static saveSearch(searchModel) {
        return this.client.makeRequestSimple(searchModel, '/search', 'POST');
    }

    /**
     * Delete a search
     * @param searchId
     * @returns {*}
     */
    static deleteSearch(searchId) {
        return this.client.makeRequest({}, `/search/${searchId}`, 'DELETE');
    }

    static updateSearch(searchId, searchModel) {
        return this.client.makeRequestSimple(searchModel, `/search/${searchId}`, 'PUT');
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
