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

    static createDomain(domain: string): Promise<EmailServiceVerifyResponse> {
        return EmailService.client.makeRequestSimple({domain}, '/configuration/whitelabel', 'POST').then(({data}: {data: EmailServiceVerifyResponse}) => data);
    }

    static verifyDomain(domain: string): Promise<EmailServiceVerifyResponse> {
        return EmailService.client.makeRequestSimple({domain}, '/configuration/whitelabel/verify', 'POST').then(({data}: {data: EmailServiceVerifyResponse}) => data);
    }
}
