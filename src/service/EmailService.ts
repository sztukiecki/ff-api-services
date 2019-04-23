import { EmailServiceVerifyResponse, Mail } from '@flowfact/types';
import { APIClient, APIMapping } from '../http';
import { AxiosResponse } from 'axios';

export class EmailService extends APIClient {
    constructor() {
        super(APIMapping.emailService);
    }

    /**
     * TODO: Please comment this method
     * @param domain
     */
    async createDomain(domain: string): Promise<EmailServiceVerifyResponse> {
        return (await this.invokeApi('/configuration/whitelabel', 'POST', {domain})).data;
    }

    /**
     * TODO: Please comment this method
     * @param domain
     */
    async verifyDomain(domain: string): Promise<EmailServiceVerifyResponse> {
        return (await this.invokeApi('/configuration/whitelabel/verify', 'POST', {domain})).data;
    }

    /**
     * TODO: Please comment this method
     * @param s3Key
     */
    async fetchMailBody(s3Key: string): Promise<AxiosResponse<String>> {
        return this.invokeApi('/body/html', 'GET', undefined, {
            queryParams: {
                s3key: s3Key,
            },
        });
    }

    async sendMail(mail: Mail): Promise<AxiosResponse> {
        const formData = new FormData();
        formData.append('model', JSON.stringify(mail));
        return this.invokeApi('/mails/html', 'POST', formData, {headers: {'Content-Type': 'multipart/form-data'}});
    }
}

export default new EmailService();
