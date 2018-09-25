import { APIClient, APIMapping } from '../http';
import { AxiosResponse } from 'axios';
import { DslBuilder } from "@flowfact/node-flowdsl";
import { Flowdsl, FlowdslConditionUnion } from "@flowfact/node-flowdsl/lib/Flowdsl";
import { EntityIdCondition, HasFieldWithValueCondition } from "@flowfact/node-flowdsl/src/Flowdsl";
import { SearchResult } from '../util/InternalTypes';
import { Entity } from '@flowfact/types';

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
            queryParams.page = page;
        }
        if (size) {
            queryParams.size = size;
        }

        return this.invokeApi<SearchResult<Entity>>('/schemas/' + index, 'POST', query, {
            queryParams: queryParams,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    count(query: Flowdsl, index: string) {
        return this.invokeApi('/schemas/' + index + '/count', 'POST', query, {
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

        return this.invokeApi<SearchResult<Entity>>('/schemas/' + index, 'POST', this.buildQuery(filter, sorting), {
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
            if (filterConfiguration.value && filterConfiguration.value !== '') {
                const conditions: FlowdslConditionUnion[] = filterConfiguration.fields.map(field => {
                    if (field === 'id') {
                        return <EntityIdCondition>{
                            type: 'ENTITYID',
                            values: [filterConfiguration.value]
                        };
                    }
                    return <HasFieldWithValueCondition>{
                        type: 'HASFIELDWITHVALUE',
                        field: field,
                        value: filterConfiguration.value,
                        operator: 'LIKE'
                    };
                });

                builder.withCondition({
                    type: 'OR',
                    conditions: conditions
                });
            }

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
