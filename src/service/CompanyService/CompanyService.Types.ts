import { S3File } from '@flowfact/types';

export namespace CompanyServiceTypes {
    export type ID = string;

    export interface CompanyGroup {
        name: string;
        caption: string;
        members: string[];
        membersSize: number;
    }

    export interface EntitlementInfo {
        start: string;
        end: string;
        entitlementOrigin: string;
        status: string;
    }

    export interface LegislationCheckbox {
        value: string;
        label: string;
        required: boolean;
        defaultChecked: boolean;
    }

    export interface LegislationText {
        id: ID;
        legislationTextName: string;
        legislationTextContent: string;
        legislationCheckboxes: LegislationCheckbox[];
    }

    export interface Company {
        id: ID;
        businessType: string;
        companyBank: string;
        companyBic: string;
        companyCity: string;
        companyFax: string;
        companyHrb: string;
        companyHrbPlace: string;
        companyIban: string;
        companyMailInfo: string;
        companyMarket: string;
        companyName: string;
        companyPhoneInfo: string;
        companyPostcode: string;
        companyResponsiblePersons: string;
        companySize: string;
        companyStreet: string;
        companyUrl: string;
        companyUrlFacebook: string;
        companyUrlGoogle: string;
        companyUrlImprint: string;
        companyUrlLinkedin: string;
        companyUrlPrivacy: string;
        companyUrlTwitter: string;
        companyUstId: string;
        creatorId: string;
        domain: string;
        entitlementInfo: EntitlementInfo;
        legislationTexts: LegislationText[];
        logo: S3File;
        navisionId: string;
        origin: string;
        ownerClass: string;
        purposeOfDataProcessing: string;
        revocation: S3File;
        tax: number;
        terms: S3File;
        timestamp: number;
        trial: boolean;
        verified: boolean;
    }

    export interface ShortCompany {
        id: ID;
        name: string;
        logoUrl: string;
    }

    export enum OwnerClass {
        CUSTOMER = 'CUSTOMER',
        INTERNAL = 'INTERNAL',
        EXTERNAL_DEVELOPER = 'EXTERNAL_DEVELOPER',
    }
}
