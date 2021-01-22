export declare namespace EntitlementServiceTypes {
    export enum EntitlementType {
        maxUser = 'maxUser',
        dashboardDisabled = 'dashboardDisabled',
    }

    export enum MainPackage {
        UNLIMITED = 'UNLIMITED',
        ESSENTIAL = 'ESSENTIAL',
        EXPERT = 'EXPERT',
    }
    export interface Entitlement {
        name: EntitlementType;
        value: boolean | number;
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
