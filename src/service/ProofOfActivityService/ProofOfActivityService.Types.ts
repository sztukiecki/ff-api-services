import { Captions, SchemaV2FieldType } from '@flowfact/types';
import { Flowdsl } from '@flowfact/node-flowdsl';

export namespace ProofOfActivityServiceTypes {
    export interface EmailData {
        from: {
            email: string;
        };
        to: {
            email: string;
            entityId: string;
            schema: string;
        };
    }

    export interface DateRange {
        from: string;
        to: string;
    }

    export interface EntityIdData {
        id: string;
        schema: string;
    }

    export interface ExcludedItem {
        id: string;
        dataSourceId: string;
    }

    export namespace Templates {
        export interface Template {
            captions: Captions;
            companyId: string;
            id: string;
            metadata: object;
            prefix: string;
        }

        export interface TemplatesResponse {
            lastId: string;
            size: number;
            entries: Template[];
        }
    }

    export namespace Activities {
        export interface DataSource {
            captions: Captions;
            id: string;
            schema: string;
            mapping: { [key: string]: string };
            search: Flowdsl;
        }

        export interface ResultViewColumn {
            captions: Captions;
            fieldType: SchemaV2FieldType;
            name: string;
            privat: boolean;
            target: string;
        }

        export interface Activity {
            captions: Captions;
            companyId: string;
            id: string;
            sortBy: string;
            metadata: object;
            dataSources: DataSource[];
            resultViewColumns: ResultViewColumn[];
        }

        export interface ActivitiesResponse {
            lastId: string;
            size: number;
            entries: Activity[];
        }

        export interface ActivityStatistic {
            count: number;
            schema: {
                caption: string;
                email: string;
            };
        }

        export interface ActivityEntry {
            dataSourceId: string;
            id: string;
            [key: string]: any;
        }

        export interface ActivityResponse {
            entries: ActivityEntry[];
            stats: ActivityStatistic[];
        }
    }
}
