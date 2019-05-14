import APIClient from '../http/APIClient';
import { APIMapping } from '../http';
import { AxiosResponse } from 'axios';

export class BehaviourService extends APIClient {

    constructor() {
        super(APIMapping.behaviourService);
    }

    async trackLogin(): Promise<AxiosResponse> {
        return await this.invokeApi(`/users/currentUser/trackLogin`, 'GET');
    }

}

export default new BehaviourService();