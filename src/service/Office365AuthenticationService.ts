import {APIClient, APIMapping} from '../http';
import {AxiosResponse} from "axios";

export class Office365AuthenticationService extends APIClient {

	constructor() {
		super(APIMapping.office365AuthenticationService);
	}

	authenticate(temporaryToken: string): Promise<AxiosResponse> {
		return this.invokeApi('/public/prototype/authenticate', 'GET', undefined, {
			queryParams: {
				temporaryToken: temporaryToken
			}
		});
	}
}

export default new Office365AuthenticationService();