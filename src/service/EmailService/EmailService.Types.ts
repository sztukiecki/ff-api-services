export namespace EmailServiceTypes {
    export interface DnsEntry {
        valid: boolean;
        type: 'a' | 'cname';
        host: string;
        data: string;
    }
    export interface DomainConfigurationResponse {
        domain: string;
        valid: boolean;
        dnsEntries: DnsEntry[];
    }
    export interface Email {
        mailFrom: string;
        replyTo?: string;
        recipientList: string[];
        blindCopyList?: string[];
        carbonCopyList?: string[];
        subject: string;
        body: string;
        schemaId?: string;
        entityId?: string;
    }

    export enum EmailTemplate {
        AdviceInteractiveExpose = 'adviceInteractiveExpose',
        AdviceEmail = 'adviceEmail',
        AdviceInquiryProcessing = 'adviceInquiryProcessing',
        AdvicePortalInsertion = 'advicePortalInsertion',
    }

    export enum EmailRecipient {
        ACCOUNT_MANAGER = 'ACCOUNT_MANAGER',
        ADMIN = 'ADMIN',
        USER = 'USER',
        EXTERNAL = 'EXTERNAL',
    }
}
