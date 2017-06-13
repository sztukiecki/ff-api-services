declare module 'ff-api-services' {
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

    export class EmailService {
        static createDomain(domain): Promise<EmailServiceVerifyResponse>;
        static verifyDomain(domain): Promise<EmailServiceVerifyResponse>;
    }

    export class ViewDefinitionService {
        static getDefinitionsForSchema(schemaId): Promise<any>
    }
}
