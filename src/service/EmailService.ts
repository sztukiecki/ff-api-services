import { APIClient, APIMapping } from '../http';
import {AxiosResponse} from "axios";

export interface EmailServiceVerifyDnsEntry {
    valid: boolean;
    type: 'a' | 'cname';
    host: string;
    data: string;
}

export interface EmailServiceVerifyResponse {
    domain: string;
    valid: boolean;
    dnsEntries: EmailServiceVerifyDnsEntry[];
}

export class EmailService extends APIClient {
    constructor() {
        super(APIMapping.emailService);
    }

    async createDomain(domain: string): Promise<EmailServiceVerifyResponse> {
        return (await this.invokeApi('/configuration/whitelabel', 'POST', {domain})).data;
    }

    async verifyDomain(domain: string): Promise<EmailServiceVerifyResponse> {
        return (await this.invokeApi('/configuration/whitelabel/verify', 'POST', {domain})).data;
    }

    async fetchMailBody(s3Key: string): Promise<AxiosResponse<String>> {
        return this.invokeApi('/body/html', 'GET', undefined, {
            queryParams: {
                s3key: s3Key
            }
        });
    }
}

export default new EmailService();
