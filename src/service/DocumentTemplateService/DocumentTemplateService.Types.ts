import { Captions } from '@flowfact/types';

export interface NeededPlaceholder {
    alias: string;
    schemaName: string;
    captions: Captions
}

export interface BaseTemplate {
    name: string;
    categoryName: string;
    captions: Captions;
    fileType: string;
    neededPlaceholders: NeededPlaceholder[]
}

export interface ReadTemplate extends BaseTemplate {
    id: string;
    url: string;
}

export interface BaseCategory {
    parentName: string;
    name: string;
    captions: Captions;
}

export interface ReadCategory {
    children: ReadCategory[];
}

export interface WriteCategory extends BaseCategory {}
export interface WriteTemplate extends BaseTemplate {}
