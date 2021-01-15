import { Contact, EntityView } from '@flowfact/types';

export namespace GDPRServiceTypes {
    export type ExportFileType = 'JSON' | 'CSV' | 'XML';
    export type DataChangeRequestApprovalStatus = 'APPROVED' | 'DENIED';
    export type DataChangeRequestType = 'DELETE' | 'CHANGE' | 'PROCESS_LIMITATION';
    export type UserConsentStatus = 'DEFAULT' | 'BLOCKED' | 'CONSENT_PENDING' | 'CONSENT_GRANTED';
    export type ConsentSource = 'CONTACT' | 'MANUAL' | 'IMPLICIT';

    export interface DataChangeRequest {
        id: string;
        contactId: string;
        companyId: string;
        requestDateTime: Date;
        processingDateTime: Date;
        note: string;
        type: DataChangeRequestType;
        approvalStatus: DataChangeRequestApprovalStatus;
        changes: Map<string, object>;
    }

    export interface ExportRequestBody {
        contactId: string;
        exportType: ExportFileType;
        recipientEmail: string;
    }

    export interface Consents {
        entries: EntityView[];
    }

    export interface CompanyTerms {
        privacyUrl: string;
        imprintUrl: string;
        termsOfServiceUrl?: string;
        purposeOfDataProcessing: string;
    }

    export interface ConsentData {
        userId: string;
        companyId: string;
        contact: Contact;
    }

    export interface ConsentByContact {
        [key: string]: boolean;
    }
    export interface CompanySettings {
        companyId: string;
        contactApproachAlwaysAllowed: boolean;
    }

    export interface ConsentStatus {
        contact: string;
        isBlocked: boolean;
        status: UserConsentStatus;
        consentSource: ConsentSource;
        author: string;
    }

    export enum ConsentPurpose {
        GENERAL_CONTACT_CONSENT = 'GENERAL_CONTACT_CONSENT',
        ESTATE_CONTACT_CONSENT = 'ESTATE_CONTACT_CONSENT',
        NEWSLETTER = 'NEWSLETTER',
    }

    export interface ConsentRequestBody {
        contactIds: string[];
        gdprConsentRequest: ConsentRequest;
    }

    export interface ConsentRequest {
        gdprConsentPurpose: ConsentPurpose;
        estateIds?: string[];
    }
}
