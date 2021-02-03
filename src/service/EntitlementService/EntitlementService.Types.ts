export declare namespace EntitlementServiceTypes {
    export type EntitlementType = 'activeSeatsLimit' | 'dashboardDisabled';
    export type EntitlementValueType = boolean | string | number;

    export enum MainPackage {
        UNLIMITED = 'UNLIMITED',
        ESSENTIAL = 'ESSENTIAL',
        EXPERT = 'EXPERT',
    }
    export interface Entitlement {
        name: EntitlementType;
        value: string;
    }

    export interface EntitlementsObject {
        [key: string]: EntitlementValueType;
    }

    export interface Package {
        name: MainPackage;
        endDate: string;
    }
    export interface PackageWithEntitlements {
        packages: Package[];
        entitlements: Entitlement[];
    }

    export interface EntitlementResponse extends PackageWithEntitlements {}
}
