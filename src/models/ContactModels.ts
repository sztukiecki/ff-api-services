export interface SearchResultOfContact {
    entries?: Contact[] | undefined;
}

export interface Contact {
    firstName: string;
    lastName: string;
    salutationformal?: string | undefined;
    salutationletter?: string | undefined;
    salutation?: string | undefined;
    emails?: string[] | undefined;
    tags?: string[] | undefined;
    parent?: string | undefined;
    status?: string | undefined;
    identifier?: string | undefined;
    company?: string | undefined;
    keywords?: string[] | undefined;
    images?: any | undefined;
    phones?: any[] | undefined;
    addresses?: any[] | undefined;
    contacttypes_allowed?: any[] | undefined;

    [key: string]: any;
}

export interface IdModel {
    id?: string | undefined;
}

export interface ContactGroupResponse {
    email?: string | undefined;
    contacts?: Contact[] | undefined;
}

export interface Flowdsl {
    aggregations?: FlowdslAggregation[] | undefined;
    conditions?: any[] | undefined;
    distinct: boolean;
    fetch?: string[] | undefined;
    target: QueryTargetEnum;
}

export interface FlowdslAggregation {
    alias?: string | undefined;
    field?: string | undefined;
    function?: string | undefined;
}

export enum QueryTargetEnum {
    Entity = 0,
    Tag = 1,
}

export interface Schema {
    captions?: Setting[] | undefined;
    groups?: string[] | undefined;
    settings?: Setting[] | undefined;
    fields?: Field[] | undefined;
    _refs?: Refs[] | undefined;
    name?: string | undefined;

    [key: string]: any;
}

export interface Setting {
    key?: string | undefined;
    value?: string | undefined;
    values?: Field[] | undefined;
}

export interface Field {
    name?: string | undefined;
    settings?: Setting[] | undefined;
}

export interface Refs {
    uri?: string | undefined;
    type?: string | undefined;
    relation?: string | undefined;

    [key: string]: any;
}

export interface FileResponse {
    data: Blob;
    status: number;
    fileName?: string;
    headers?: { [name: string]: any };
}
