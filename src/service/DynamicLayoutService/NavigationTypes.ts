import { Captions, LayoutContainer } from '@flowfact/types';

export namespace NavigationTypes {
    export interface ACP {
        id: string;
        grantType: 'template' | 'group';
    }

    export interface Access {
        acps?: ACP[];
        hideFromCrm?: boolean;
    }

    export interface BaseItem {
        name: string;
        access?: Access;
        captions: Captions;
    }

    export interface Item extends BaseItem {
        type: 'REDIRECT';
        url: string;
    }

    export interface Section extends BaseItem {
        items: Item[];
    }

    export interface NavigationEntry {
        icon: string;
        type: 'EXPANDABLE' | 'REDIRECT';
        url?: string;
        sections?: Section[];
    }

    export interface Navigation {
        entries: NavigationEntry[];
    }
}

export namespace WidgetLayoutTypes {
    export interface WidgetLayout {
        id: string;
        schema: string;
        global: boolean;
        layout: LayoutContainer;
    }

    export interface PagedWidgetLayouts {
        offset: number;
        total: number;
        items: WidgetLayout[];
    }
}
