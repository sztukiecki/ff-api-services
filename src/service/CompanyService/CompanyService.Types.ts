import { S3File } from '@flowfact/types';

export namespace CompanyServiceTypes {
    export type ID = string;

    export interface CompanyGroup {
        name: string;
        caption: string;
        members: string[];
        membersSize: number;
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
        companyName: string;
        companyStreet: string;
        companyPostcode: string;
        companyCity: string;
        companyUrl: string;
        companyPhoneInfo: string;
        companyFax: string;
        companyMailInfo: string;
        companyMarket: string;
        companyHrb: string;
        companyHrbPlace: string;
        companyUstId: string;
        companyUrlFacebook: string;
        companyUrlTwitter: string;
        companyUrlGoogle: string;
        companyUrlLinkedin: string;
        companyUrlImprint: string;
        companyUrlPrivacy: string;
        companyResponsiblePersons: string;
        logo: S3File;
        terms: S3File;
        revocation?: S3File;
        legislationTexts: LegislationText[];
        purposeOfDataProcessing: string;
        creatorId: string;
        timestamp: number;
        navisionId: string;
        verified: boolean;
        trial: boolean;
    }

    export interface ShortCompany {
        id: ID;
        name: string;
        logoUrl: string;
    }

    export type OwnerClass = 'CUSTOMER' | 'INTERNAL' | 'EXTERNAL_DEVELOPER';
}
