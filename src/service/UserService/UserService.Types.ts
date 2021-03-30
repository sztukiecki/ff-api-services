import { Captions, S3File, SchemaV2FieldType } from '@flowfact/types';

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
    COGNITO_SAML = 'COGNITO_SAML',
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

export interface SSOResponse {
    type: SsoType;
    clientId: string;
}

export interface SSOTokenResponse {
    idToken: string;
    accessToken: string;
    refreshToken: string;
    username: string;
}

export interface AdditionalField {
    id: string;
    name: string;
    captions: Captions;
    type: SchemaV2FieldType;
    mandatory: boolean;
}

export interface UserAdditionalData {
    key: string;
    value: string;
}
