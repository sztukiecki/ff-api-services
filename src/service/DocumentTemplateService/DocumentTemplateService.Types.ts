import { Captions } from '@flowfact/types';

export interface NeededPlaceholder {
    type: 'USER_INPUT' | 'ENTITY_PICK';
    alias: string;
    schemaName?: string;
    captions: Captions;
}

export interface BaseTemplate {
    name: string;
    categoryName?: string;
    captions: Captions;
    fileType: string;
    neededPlaceholders: NeededPlaceholder[]
}

export interface ReadTemplate extends BaseTemplate {
    id: string;
    url: string;
    custom: boolean;
}

export interface BaseCategory {
    parentName: string | null;
    name: string;
    captions: Captions;
}

export interface ReadCategory extends BaseCategory {
    custom: boolean;
}

export interface JSONPatch {
    op: 'replace' | 'add' | 'remove',
    path: string;
    value?: any;
}

export interface WriteTemplate extends BaseTemplate {}
export interface WriteCategory extends BaseCategory {}
