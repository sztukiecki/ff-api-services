import { Captions, Layout } from '@flowfact/types';

export namespace WidgetLayoutTypes {
    export enum LayoutDomainType {
        GENERAL = 'GENERAL',
        SCHEMA_BOUND = 'SCHEMA_BOUND',
    }

    export interface BaseWidgetLayout {
        id: string;
        sorting?: number;
        captions: Captions;
        global: boolean;
        layout: Layout;
        domainType: LayoutDomainType;
    }

    export interface GeneralWidgetLayout extends BaseWidgetLayout {
        domainType: LayoutDomainType.GENERAL;
    }

    export interface SchemaBoundWidgetLayout extends BaseWidgetLayout {
        schema: string;
        domainType: LayoutDomainType.SCHEMA_BOUND;
    }

    export interface PagedWidgetLayouts {
        offset: number;
        total: number;
        items: SchemaBoundWidgetLayout[];
    }
}
