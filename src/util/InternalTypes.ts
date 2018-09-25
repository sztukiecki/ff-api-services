export type UniformObject<T> = {[key: string]: T};
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

export type PhaseName = 'acquisition' | 'preparation' | 'marketing' | 'closing' | 'after_sales';
