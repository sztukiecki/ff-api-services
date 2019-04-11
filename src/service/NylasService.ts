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

interface AuthRequest {
    email: string,
    name: string,
    provider: string,
    settings: AuthRequestSettings
}

interface AuthRequestSettings {
    imapHost: string,
    imapPort: string,
    imapUsername: string,
    imapPassword: string,
    smtpHost: string,
    smtpPort: string,
    smtpUsername: string,
    smtpPassword: string
}

/**
 * See https://docs.nylas.com/reference for more info
 */
export class NylasService extends APIClient {

    constructor() {
        super(APIMapping.nylasService);
    }

    /**
     * Authorize a user with the code from the nylas callback
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
     * Authorize a user with specific credentials
     * @param authRequest IMAP/SMTP credentials
     */
    async nativeAuth(authRequest: AuthRequest): Promise<AxiosResponse> {
        return await this.invokeApi('/authorize', 'POST', authRequest, {
            queryParams: {
                nativeAuth: true
            }
        });
    }

    /**
     * Reactivates a 'cancelled' account and sets it back to 'paid' in nylas
     * @param email the email address to reactivate
     */
    async reactivate(email: string): Promise<AxiosResponse> {
        return await this.invokeApi('/reactivate', 'POST', undefined, {
            queryParams: {
                email: email
            }
        });
    }

    /**
     * Sends an email using the nylas api
     * @param emailAccount the email to be sending from
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
     *
     */
    async fetchConfig(): Promise<AxiosResponse<NylasConfig>> {
        return await this.invokeApi('/config', 'GET');
    }

    /**
     * Generate a url that follows the nylas hosted authorization flow
     * @param email
     * @param callbackUrl URL that has to be confiured
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
