export type UniformObject<T> = {[key: string]: T};
export type ParamList = UniformObject<string | number | undefined>;

export interface SearchResult<T> {
    entries: T[];
    totalCount: number;
    page: number;
    pageSize: number;
}
