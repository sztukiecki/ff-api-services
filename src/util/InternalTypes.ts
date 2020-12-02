export type UniformObject<T> = { [key: string]: T };
export type ParamList = UniformObject<boolean | string | number | undefined>;

export interface EntityQuery {
    entityId: string;
    schemaId: string;
}

export interface EntitySchemaQuery {
    entityId: string;
    schema: string;
}

// --- property-marketing-phase-service ---

export interface PhaseConfigurationInformation {
    id: string;
    schemaName: string;
    timestamp: number;
    phaseConfiguration: any;
}

export interface EntityPhaseInformation {
    entityId: string;
    schemaId: string;
    phaseName: PhaseName;
}

export type PhaseName = 'acquisition' | 'preparation' | 'marketing' | 'closing' | 'after_sales';
