export declare namespace EntitlementServiceTypes {
    enum EntitlementType {
        maxUser = "maxUser",
        dashboardDisabled = "dashboardDisabled"
    }
    enum MainPackageName {
        UNLIMITED = 'UNLIMITED',
        ESSENTIAL = 'ESSENTIAL',
        EXPERT = 'EXPERT',
    }
    interface Entitlement {
        name: EntitlementType;
        value: boolean | number;
    }
    interface Package {
        name: MainPackageName;
        endDate: string;
    }
    interface PackageWithEntitlements {
        packages: Package[];
        entitlements: Entitlement[];
    }
    interface EntitlementResponse extends PackageWithEntitlements {
    }
}
