import {APIClient, APIMapping} from '../http';
import { AxiosResponse } from 'axios';

export class SearchService extends APIClient {

    constructor() {
        super(APIMapping.searchService);
    }

    /**
     * Get all searches as short searches. Just the ID and the Name of the search
     * will be returned in a array.
     */
    getSearches(): Promise<AxiosResponse> {
        return this.invokeApi('/search', 'GET');
    }

    /**
     * Get the full search information by id.
     */
    getSearch(searchId: string) {
        return this.invokeApi(`/search/${searchId}`, 'GET');
    }

    saveSearch(searchModel: any) {
        return this.invokeApi('/search', 'POST', searchModel);
    }

    deleteSearch(searchId: string) {
        return this.invokeApi(`/search/${searchId}`, 'DELETE');
    }

    updateSearch(searchId: string, searchModel: any) {
        return this.invokeApi(`/search/${searchId}`, 'PUT', searchModel);
    }

    search(query: any, index: string, page: number = 1, size?: number) {
        if (typeof query === 'string') {
            query = JSON.parse(query);
        }
        return this.invokeApi('/index/' + index, 'POST', query);
    }

    filter(index: string, page: number = 1, size: number = 30, filter: string, sorting: any) {
        let queryParams: any = {};
        if(page) {
            queryParams.page = page;
        }
        if(size) {
            queryParams.size = size;
        }

        return this.invokeApi('/index/' + index, 'POST', this.buildQuery(filter, sorting), {queryParams});
    }

    buildQuery(filter: string, sorting: any) {
        let query = {};
        if (!filter) {
            query = {
                'query': {
                    'match_all': {}
                }
            };
        } else {
            query = {
                'query': {
                    'match_phrase': {
                        '_all': filter
                    }
                }
            }
        }

        if(sorting) {
            query['sort'] = {
                _script : {
                    type: 'string',
                    order: sorting.order,
                    script: {
                        lang: 'painless',
                        inline: `def field = doc['${sorting.key}.values.raw']; if(field.value != null) { return field.value.toString().toUpperCase(); } return '';`
                    }
                }
            }
        }

        return query;
    }
}

export default new SearchService();
