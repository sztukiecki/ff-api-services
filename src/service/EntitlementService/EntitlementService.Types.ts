export namespace EntitlementServiceTypes {
    export interface Entitlement {
        name: string;
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
