import HttpClient, {APIMapping} from '../http';

interface EmailServiceVerifyDnsEntry {
    valid: boolean;
    type: "a" | "cname";
    host: string;
    data: string;
}

interface EmailServiceVerifyResponse {
    domain: string;
    valid: boolean;
    dnsEntries: EmailServiceVerifyDnsEntry[];
}

export default class EmailService {
    static client = new HttpClient(APIMapping.emailService);

    static async createDomain(domain: string): Promise<EmailServiceVerifyResponse> {
        return (await EmailService.client.makeRequestSimple({domain}, '/configuration/whitelabel', 'POST')).data;
    }

    static async verifyDomain(domain: string): Promise<EmailServiceVerifyResponse> {
        return (await EmailService.client.makeRequestSimple({domain}, '/configuration/whitelabel/verify', 'POST')).data;
    }
}
