export namespace EntitlementServiceTypes {
    export enum EntitlementType {
        maxUser = 'maxUser',
        dashboardDisabled = 'dashboardDisabled',
    }
    export interface Entitlement {
        name: EntitlementType;
        value: boolean | number;
    }

    export interface Package {
        name: string;
        endDate: string;
    }

    export interface PackageWithEntitlements {
        packages: Package[];
        entitlements: Entitlement[];
    }

    export interface EntitlementResponse extends PackageWithEntitlements {}
}
