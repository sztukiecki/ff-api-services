import { S3File } from '@flowfact/types';

export type UserType = 'USER' | 'EXPORTER' | 'AUTOMATION' | 'SYSTEM' | 'API' | 'UNKNOWN';
export type UserRole = 'USER' | 'ADMIN' | 'ACCOUNT_MANAGER';

export interface IdentifiedUserResponse {
    identifier: string;
    identifiersOfMatchingAliases: string[];
}

export enum IdentifiedUserStatusCodes {
    USER_NOT_FOUND = 404,
    NO_UNIQUE_USER_FOUND = 409,
}

export interface User {
    active: boolean;
    aliasMailAddress?: string;
    businessMailAddress?: string;
    cognitoId?: string;
    cognitoUsername?: string;
    companyId?: string;
    firstname?: string;
    id?: string;
    image?: S3File;
    jobRole?: string;
    lastname?: string;
    loginRelatedMailAddress: string;
    mobile?: string;
    onboardingTutorialsActive?: boolean;
    phone?: string;
    position?: string;
    roles?: UserRole[];
    salutation?: string;
    sso?: SSO[];
    timestamp?: number;
    type?: UserType;
}

export interface UserTokenEntity {
    active: boolean;
    created: string;
    id: string;
    lastLogin: string;
    name: string;
    userId: string;
}

export interface SSO {
    ssoType: string;
}
