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

    export interface ImportableBundle {
        bundleName: string;
        includedEntities?: boolean;
        resolveRelatedBundles?: boolean;
        origin: string;
        successfullyImported?: boolean;
    }

    export interface ImportBundle {
        bundleName: string;
        scope: string;
        withEntities: boolean;
        resolveRelatedBundles?: boolean;
    }

    export interface BatchImportResult {
        id: number;
        bundles: ImportableBundle[];
        companyId: string;
        requestedByUserId: string;
        finishedWhen?: string;
        requestedWhen: string;
        startedWhen: string;
    }
}
