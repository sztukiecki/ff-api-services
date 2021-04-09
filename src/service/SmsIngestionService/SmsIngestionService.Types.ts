export namespace SmsIngestionServiceTypes {
    export interface TextMessageRequest {
        estateId?: string;
        senderPhoneNumber: string;
        recipients: string[];
        recipientsPhoneNumber: string[];
        message: string;
        channel: Channel;
    }

    export enum Channel {
        SMS = 'SMS',
        WhatsApp = 'WhatsApp',
    }
}
