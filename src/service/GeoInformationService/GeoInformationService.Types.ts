import { Captions } from '@flowfact/types';

export namespace GeoInformationsServiceTypes {
    export interface FindPolygonResponse {
        size: number;
        values: GeoInformation[];
    }
    export interface GeoInformation {
        global: boolean;
        labels: Captions;
        name: string;
        parent: string;
    }
}
