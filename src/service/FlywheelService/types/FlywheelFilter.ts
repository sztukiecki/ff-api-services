export type FlywheelFilter =
    ExcludeStepsFilter |
    ExcludeKanbansFilter |
    SchemaIdFilter |
    ExcludeCustomerFilter |
    ExcludeMasterFilter;

export interface ExcludeStepsFilter {
    type: 'EXCLUDE_PHASE_STEPS';
}

export interface ExcludeKanbansFilter {
    type: 'EXCLUDE_PHASE_NON_STEPS';
}

export interface SchemaIdFilter {
    type: 'MATCH_SCHEMA_ID';
    data: {
        schemaId: string;
    };
}

export interface ExcludeCustomerFilter {
    type: 'EXCLUDE_CUSTOMER';
}

export interface ExcludeMasterFilter {
    type: 'EXCLUDE_MASTER';
}
