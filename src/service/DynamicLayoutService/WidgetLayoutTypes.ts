import { Captions, Layout } from "@flowfact/types";

export namespace WidgetLayoutTypes {
  export enum LayoutType {
    GENERAL = "GENERAL",
    SCHEMA_BOUND = "SCHEMA_BOUND",
  }

  export interface BaseWidgetLayout {
    id: string;
    sorting?: number;
    captions: Captions;
    global: boolean;
    layout: Layout;
    type: LayoutType;
  }

  export interface GeneralWidgetLayout extends BaseWidgetLayout {
    type: LayoutType.GENERAL;
  }

  export interface SchemaBoundWidgetLayout extends BaseWidgetLayout {
    schema: string;
    type: LayoutType.SCHEMA_BOUND;
  }

  export interface PagedWidgetLayouts {
    offset: number;
    total: number;
    items: SchemaBoundWidgetLayout[];
  }
}
