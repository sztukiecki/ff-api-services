export namespace SmsIngestionServiceTypes {
    export interface SmsData {
        estateId?: string;
        senderPhoneNumber: string;
        recipients: string[];
        recipientsPhoneNumber: string[];
        message: string;
    }

    export interface Credentials {
        companyId: string;
        token: string;
        created: Date;
        lastUpdated: Date;
    }
}
