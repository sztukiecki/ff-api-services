import APIClient from '../http/APIClient';
import APIMapping from '../http/APIMapping';
import { AxiosResponse } from 'axios';

interface SendEmailRequest {
    subject: string;
    to: EmailAddress[];
    cc: EmailAddress[];
    bcc: EmailAddress[];
    from: EmailAddress[];
    reply_to: EmailAddress[];
    body: string;
    file_ids: string[];
    tracking: Tracking;
}

interface EmailAddress {
    email: string;
    name: string;
}

interface Tracking {
    links: boolean;
    opens: boolean;
    thread_replies: boolean;
    payload: string;
}

interface NylasConfig {
    emails: EmailAddress[];
}

export class NylasService extends APIClient {

    constructor() {
        super(APIMapping.nylasService);
    }

    async authorizeUser(code: string): Promise<AxiosResponse> {
        return await this.invokeApi('/authorize', 'POST', undefined, {
            queryParams: {
                code: code
            }
        });
    }

    async sendMail(emailAccount: string, email: SendEmailRequest): Promise<AxiosResponse> {
        return await this.invokeApi('/nylas/send', 'POST', email, {
            'queryParams': {
                'email': emailAccount
            }
        });
    }

    async getConfig(): Promise<AxiosResponse<NylasConfig>> {
        return await this.invokeApi('/config', 'GET');
    }
}

export default new NylasService();
