import { Captions } from '@flowfact/types';
import { ViewActionType, ViewType } from './ViewDefinitionService.Types';

export enum ViewDefinitionV2CategoryContentItemTypes {
    MULTIMEDIA = 'MULTIMEDIA',
    ENTITY = 'ENTITY',
    TEXT = 'TEXT',
    SCHEMA = 'SCHEMA',
    SCHEMA_INFO = 'SCHEMA_INFO',
}
export type ViewDefinitionV2CategoryContentItemType = keyof typeof ViewDefinitionV2CategoryContentItemTypes;

export interface ViewDefinitionV2CategoryMediaItem {
    type: ViewDefinitionV2CategoryContentItemTypes.MULTIMEDIA;
    album?: string;
    category?: string;
    index: number;
}

export interface ViewDefinitionV2CategoryEntityItem {
    type: ViewDefinitionV2CategoryContentItemTypes.ENTITY;
    fieldName?: string;
}

export interface ViewDefinitionV2CategoryTextItem {
    type: ViewDefinitionV2CategoryContentItemTypes.TEXT;
    captions: Captions;
}

export interface ViewDefinitionV2CategorySchemaItem {
    type: ViewDefinitionV2CategoryContentItemTypes.SCHEMA_INFO;
}

export interface ViewDefinitionV2CategoryLinkedEntityItem {
    type: ViewDefinitionV2CategoryContentItemTypes.SCHEMA;
    fieldName: string;
    content: ViewDefinitionV2CategoryContentItem[];
}

export type ViewDefinitionV2CategoryContentItem =
    | ViewDefinitionV2CategorySchemaItem
    | ViewDefinitionV2CategoryTextItem
    | ViewDefinitionV2CategoryMediaItem
    | ViewDefinitionV2CategoryEntityItem
    | ViewDefinitionV2CategoryLinkedEntityItem;

export interface ViewDefinitionV2Category {
    name: string;
    id: string;
    captions: Captions;
    content: ViewDefinitionV2CategoryContentItem[];
}

export interface ViewDefinitionV2 {
    id: string;
    metadata?: object;
    type: ViewType;
    default: boolean;
    actions: ViewActionType[];
    captions: Captions;
    categories: ViewDefinitionV2Category[];
}
