import { AxiosResponse } from 'axios';
import { APIClient, APIMapping } from '../http';

export class OmniChannelService extends APIClient {
    constructor() {
        super(APIMapping.omniChannelService);
    }

    sendSMS(from: string, to: string, message: string): Promise<AxiosResponse> {
        return this.invokeApi('/sendSMS', 'POST', {
            from,
            to,
            message
        });
    }
}

export default new OmniChannelService();