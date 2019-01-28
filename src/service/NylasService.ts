import APIClient from '../http/APIClient';
import APIMapping from '../http/APIMapping';
import { AxiosResponse } from 'axios';

interface SendEmailRequest {
	subject: string;
	to: string[];
	cc: string[];
	bcc: string[];
	from: string;
	reply_to: string[];
	body: string;
	file_ids: string[];
	tracking: Tracking;
}

interface Tracking {
	links: boolean;
	opens: boolean;
	thread_replies: boolean;
	payload: string;
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
}

export default new NylasService();
