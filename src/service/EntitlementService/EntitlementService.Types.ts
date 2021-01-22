export declare namespace EntitlementServiceTypes {
    enum EntitlementType {
        maxUser = 'maxUser',
        dashboardDisabled = 'dashboardDisabled',
    }

    enum MainPackage {
        UNLIMITED = 'UNLIMITED',
        ESSENTIAL = 'ESSENTIAL',
        EXPERT = 'EXPERT',
    }
    interface Entitlement {
        name: EntitlementType;
        value: boolean | number;
    }
    interface Package {
        name: MainPackage;
        endDate: string;
    }
    interface PackageWithEntitlements {
        packages: Package[];
        entitlements: Entitlement[];
    }
    interface EntitlementResponse extends PackageWithEntitlements {}
}
