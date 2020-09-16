export namespace SampleDataServiceTypes {
    export interface Bundles {
        customerBundles: Bundle[];
        size: number;
    }

    export type Bundle = {
        id: number;
        name: string;
        scope: string;
        activatedForCustomer: boolean;
        author: string;
        captions: object;
        description: string;
        selectableByCustomer: boolean;
        version: number;
    };

    export type BatchImportResult = {
        bundles: BatchImportResultBundle;
    };

    export type BatchImportResultBundle = {
        bundleName: string;
        errorMessage?: string;
        scope: string;
        successful: boolean;
    };

    export interface ImportBundle {
        bundleName: string;
        scope: string;
        withEntities: boolean;
    }
}
