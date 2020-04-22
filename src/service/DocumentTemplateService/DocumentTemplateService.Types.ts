import { Captions } from '@flowfact/types';

export interface NeededPlaceholder {
    alias: string;
    schemaName: string;
    captions: Captions
}

export interface BaseTemplate {
    name: string;
    categoryName?: string | null;
    captions: Captions;
    fileType: string;
    neededPlaceholders: NeededPlaceholder[]
}

export interface ReadTemplate extends BaseTemplate {
    id: string;
    url: string;
}

export interface BaseCategory {
    parentName: string | null;
    name: string;
    captions: Captions;
}

export interface JSONPatch {
    op: 'replace' | 'add' | 'remove',
    path: string;
    value?: any;
}

export interface WriteTemplate extends BaseTemplate {}
