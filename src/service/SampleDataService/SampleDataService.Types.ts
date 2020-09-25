import { Captions } from '@flowfact/types';

export namespace SampleDataServiceTypes {
    export interface Bundles {
        customerBundles: Bundle[];
        size: number;
    }

    export interface Bundle {
        id: number;
        name: string;
        scope: string;
        activatedForCustomer: boolean;
        author: string;
        captions: Captions;
        description: string;
        selectableByCustomer: boolean;
        version: number;
    }

    export interface BatchImportResult {
        bundles: BatchImportResultBundle;
    }

    export interface BatchImportResultBundle {
        bundleName: string;
        errorMessage?: string;
        scope: string;
        successful: boolean;
    }

    export interface ImportBundle {
        bundleName: string;
        scope: string;
        withEntities: boolean;
    }
}
