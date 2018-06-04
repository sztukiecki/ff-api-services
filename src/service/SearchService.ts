import {APIClient, APIMapping} from '../http';
import {AxiosResponse} from 'axios';
import {DslBuilder} from "@flowfact/node-flowdsl";
import {Flowdsl} from "@flowfact/node-flowdsl/lib/Flowdsl";

export interface FilterConfiguration {
    value: string,
    fields: string[],
    limitResponse?: boolean // if true, than just the fields in the fields array will be returned
}

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

    search(query: Flowdsl, index: string, page: number = 1, size?: number) {
        let queryParams: any = {};
        if (page) {
            // page -1 because the the pages start at 0 on the backend
            queryParams.page = page;
        }
        if (size) {
            queryParams.size = size;
        }

        return this.invokeApi('/schemas/' + index, 'POST', query, {
            queryParams: queryParams,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    filter(index: string, page: number = 1, size: number = 30, filter: FilterConfiguration, sorting: any) {
        let queryParams: any = {};
        if (page) {
            // page -1 because the the pages start at 0 on the backend
            queryParams.page = page;
        }
        if (size) {
            queryParams.size = size;
        }

        return this.invokeApi('/schemas/' + index, 'POST', this.buildQuery(filter, sorting), {
            queryParams: queryParams,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    buildQuery(filterConfiguration: FilterConfiguration, sorting: any): Flowdsl {
        const builder = new DslBuilder();
        builder.target('ENTITY');
        builder.distinct(false);

        if (filterConfiguration) {
            if (filterConfiguration.value && filterConfiguration.value !== '')
                filterConfiguration.fields.forEach(field => {
                    builder.withCondition({
                        type: 'HASFIELDWITHVALUE',
                        field: field,
                        value: filterConfiguration.value
                    });
                });

            if (filterConfiguration.limitResponse) {
                builder.fetch(filterConfiguration.fields);
            }
        }

        if (sorting) {
            // don't do anything right now, because the flowdsl doesn't support sorting.
        }

        return builder.build();
    }
}

export default new SearchService();
