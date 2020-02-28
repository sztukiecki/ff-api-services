import { APIClient, APIMapping } from './http';

export class FormService extends APIClient {

    constructor() {
        super(APIMapping.formService);
    }

    /**
     * TODO: Please comment this method
     * @param integrationId
     */
    async render(integrationId: string) {
        return this.invokeApi(`/render/${integrationId}`, 'POST').then(s => s.data);
    }
}

export default new FormService();
