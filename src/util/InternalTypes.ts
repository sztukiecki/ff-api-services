import { v4 as uuid } from 'uuid/interfaces';

export type UniformObject<T> = { [key: string]: T };
export type ParamList = UniformObject<string | number | undefined>;

export interface SearchResult<T> {
    entries: T[];
    totalCount: number;
    page: number;
    pageSize: number;
}

export interface EntityQuery {
    entityId: string;
    schemaId: string;
}

export interface Captions {
    [key: string]: string;
}

export interface SchemaV2Field {
    value: string;
    captions: Captions;
    [key: string]: any;
}

export interface SchemaV2Settings {
    unit?: string;
    type?: string;
    subType?: string;
    displayInList?: boolean;
    captions?: Captions;
    fields?: {
        [key: string]: SchemaV2Field;
    };
    [key: string]: any;
}

export interface SchemaV2 {
    id: string;
    groups: string[];
    captions: Captions;
    settings: {
        [key: string]: SchemaV2Settings;
    };
}

// --- property-marketing-phase-service ---

export interface PhaseConfigurationInformation {
    id: uuid;
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
