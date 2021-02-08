import { S3File } from '@flowfact/types';

export enum UserRole {
    USER = 'USER',
    ADMIN = 'ADMIN',
    ACCOUNT_MANAGER = 'ACCOUNT_MANAGER',
}

export enum UserType {
    USER = 'USER',
    EXPORTER = 'EXPORTER',
    AUTOMATION = 'AUTOMATION',
    SYSTEM = 'SYSTEM',
    API = 'API',
    UNKNOWN = 'UNKNOWN',
}

export enum IdentifiedUserStatusCodes {
    USER_NOT_FOUND = 404,
    NO_UNIQUE_USER_FOUND = 409,
}

export enum SsoType {
    SCOUT = 'SCOUT',
}

export interface IdentifiedUserResponse {
    identifier: string;
    identifiersOfMatchingAliases: string[];
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
    ssoType: SsoType;
}
