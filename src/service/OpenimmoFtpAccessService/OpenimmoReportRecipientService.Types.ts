export namespace OpenImmoReportRecipientTypes {
    export interface OpenimmoReportRecipient {
        id: string;
        email: string;
    }

    export interface OpenimmoReportRequestRecipient {
        id?: string;
        email: string;
    }
}