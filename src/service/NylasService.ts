import { AxiosResponse } from 'axios';
import APIClient from '../http/APIClient';
import APIMapping from '../http/APIMapping';

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

interface RegistrationUrl {
    registrationUrl: string;
}

interface NylasConfig {
    emails: EmailAddress[];
}

export class NylasService extends APIClient {

    constructor() {
        super(APIMapping.nylasService);
    }

    /**
     * TODO: Please comment this method
     * @param code
     */
    async authorizeUser(code: string): Promise<AxiosResponse> {
        return await this.invokeApi('/authorize', 'POST', undefined, {
            queryParams: {
                code: code
            }
        });
    }

    /**
     * TODO: Please comment this method
     * @param emailAccount
     * @param email
     */
    async sendMail(emailAccount: string, email: SendEmailRequest): Promise<AxiosResponse> {
        return await this.invokeApi('/nylas/send', 'POST', email, {
            'queryParams': {
                'email': emailAccount
            }
        });
    }

    /**
     * TODO: Please comment this method
     */
    async fetchConfig(): Promise<AxiosResponse<NylasConfig>> {
        return await this.invokeApi('/config', 'GET');
    }

    /**
     * TODO: Please comment this method
     * @param email
     * @param callbackUrl
     */
    async getRegistrationUrl(email: string, callbackUrl?: string): Promise<AxiosResponse<RegistrationUrl>> {
        return await this.invokeApi('/registration-url', 'GET', undefined, {
            queryParams: {
                email: email,
                callbackUrl: callbackUrl
            }
        });
    }

    /**
     * TODO: Please comment this method
     * @param email
     * @param settings
     */
    async overwriteSettings(email: string, settings: object): Promise<AxiosResponse> {
        return await this.invokeApi('/config', 'POST', {
                email: email,
                configValues: settings
            }
        );
    }

    /**
     * TODO: Please comment this method
     * @param email
     * @param settings
     */
    async updateSettings(email: string, settings: object): Promise<AxiosResponse> {
        return await this.invokeApi('/config', 'PATCH', {
                email: email,
                configValues: settings
            }
        );
    }

    /**
     * TODO: Please comment this method
     */
    /* UNDER DEVELOPMENT; DOES NOT WORK YET */
    async deleteAccount(email: string): Promise<AxiosResponse> {
        return await this.invokeApi('/account', 'DELETE', undefined, {
            queryParams: {
                email: email
            }
        });
    }
}

export default new NylasService();
