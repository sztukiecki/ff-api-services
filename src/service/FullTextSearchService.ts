import {APIClient, APIMapping} from '../http';
import {AxiosResponse} from 'axios';

export class FullTextSearchService extends APIClient {

	constructor() {
		super(APIMapping.fullTextSearchService);
	}

	/**
	 * Get the full search information by id.
	 */
	search(schemaName: string, searchTerm: string, page: number = 1, size?: number, params?: {}): Promise<AxiosResponse> {
		let queryParams: any = {};
		if (page) {
			queryParams.page = page;
		}
		if (size) {
			queryParams.size = size;
		}
		queryParams.searchTerm = searchTerm;
		if (params) {
			for (const [key, value] of Object.entries(params)) {
				queryParams[key] = value;
			}
		}

		return this.invokeApi('/search/' + schemaName, 'GET', '', {
			queryParams: queryParams,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
}

export default new FullTextSearchService();
