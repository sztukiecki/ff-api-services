import { Captions } from '@flowfact/types';

export namespace WidgetTypes {
    export interface WidgetStoreItem {
        id: string;
        type: string;
        captions: Captions;
        descriptions: Captions;
        schemas: string[];
        configuration: object;
        images: {
            thumbnail: string;
            preview: string;
        }
    }

    export interface PagedWidgets {
        items: WidgetStoreItem[];
        offset: number;
        total: number;
    }
}
