import { PublishRequest } from '@flowfact/types';
import { AxiosResponse } from 'axios';
import { APIClient, APIMapping } from '../http';

export class OpenimmoPublishService extends APIClient {
    constructor() {
        super(APIMapping.openimmoPublishService);
    }

    async downloadZip(publishRequest: PublishRequest): Promise<AxiosResponse> {
        return await this.invokeApi('/service/downloadZip', 'POST', publishRequest);
    }
}

export default new OpenimmoPublishService();
