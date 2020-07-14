import { Captions, Layout } from '@flowfact/types';

export namespace WidgetLayoutTypes {
    export interface WidgetLayout {
        id: string;
        schema: string;
        sorting?: number;
        captions: Captions;
        global: boolean;
        layout: Layout;
    }

    export interface PagedWidgetLayouts {
        offset: number;
        total: number;
        items: WidgetLayout[];
    }
}
