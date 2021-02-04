import { S3File } from '@flowfact/types';
export namespace UserServiceTypes {
    export type UserType = 'USER' | 'EXPORTER' | 'AUTOMATION' | 'SYSTEM' | 'API' | 'UNKNOWN';
    export type UserRole = 'USER' | 'ADMIN' | 'ACCOUNT_MANAGER';

    export interface IdentifiedUserResponse {
        identifier: string;
        identifiersOfMatchingAliases: string[];
    }

    export interface User {
        active: boolean;
        aliasMailAddress?: string;
        businessMailAddress?: string;
        loginRelatedMailAddress: string;
        cognitoId?: string;
        cognitoUsername?: string;
        companyId?: string;
        firstname?: string;
        id?: string;
        jobRole?: string;
        image?: S3File;
        lastname?: string;
        mobile?: string;
        phone?: string;
        position?: string;
        salutation?: string;
        timestamp?: number;
        type?: UserType;
        roles?: UserRole[];
        onboardingTutorialsActive?: boolean;
        sso?: SSO[];
    }

    export interface UserTokenEntity {
        id: string;
        name: string;
        userId: string;
        created: string;
        lastLogin: string;
        active: boolean;
    }

    export interface SSO {
        ssoType: string;
    }
}
