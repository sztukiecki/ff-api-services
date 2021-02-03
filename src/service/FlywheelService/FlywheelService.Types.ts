import { Captions } from '@flowfact/types';
import { FlowdslConditionUnion } from '@flowfact/node-flowdsl';

export namespace FlywheelServiceTypes {
    export type Flywheel = {
        id: number;
        name: string;
        captions: Captions;
        phases: FlywheelPhase[];
        global: false;
    };

    export type FlywheelPhase = {
        id: number;
        name: string;
        global: boolean;
        captions: Captions;
        childrenNames: string[];
        schema: string;
        entityAmount: number;
        noStepIfChildless?: boolean;
        flowIds: string[];
        conditions?: FlowdslConditionUnion[];
        importType: ImportType;
    };

    export type CreateFlywheelPhase = {
        id?: number;
        name: string;
        global?: boolean;
        captions: Captions;
        childrenNames?: string[];
        schema: string;
        entityAmount?: number;
        noStepIfChildless?: boolean;
        flowIds?: string[];
        conditions?: FlowdslConditionUnion[];
        importType?: ImportType;
    };

    export type FlywheelPhaseTree = {
        name: string;
        global: boolean;
        captions: Captions;
        children?: FlywheelPhaseTree[];
        schema: string;
        flowIds: number[];
        conditions?: FlowdslConditionUnion[];
    };

    export type Transaction = {
        transactionId: number;
        phaseName: string;
        sequence: number;
        entity: any;
    };

    export type PagedTransactions = {
        boardName: string;
        stepName: string;
        page: number;
        totalCount: number;
        transactions?: Transaction[];
    };

    export type FlywheelPhasePatch = PhasePatch;

    export type FlywheelFilter = ExcludeStepsFilter | ExcludeKanbansFilter | SchemaIdFilter | ExcludeCustomerFilter | ExcludeMasterFilter;

    export type PhaseSyncCommands = 'resync';

    export interface ExcludeStepsFilter {
        type: 'EXCLUDE_PHASE_STEPS';
    }

    export interface ExcludeKanbansFilter {
        type: 'EXCLUDE_PHASE_NON_STEPS';
    }

    export interface SchemaIdFilter {
        type: 'MATCH_SCHEMA_ID';
        data: {
            schemaId: string;
        };
    }

    export interface ExcludeCustomerFilter {
        type: 'EXCLUDE_CUSTOMER';
    }

    export interface ExcludeMasterFilter {
        type: 'EXCLUDE_MASTER';
    }

    export type PhasePatch = {
        op: 'set-import-type';
        value: ImportType;
    };

    export type ImportType = 'only_new' | 'new_and_old';

    export namespace FlywheelStatisticTypes {
        export interface SingleStatistic {
            id: number;
            name: string;
            captions: Captions;
        }

        export interface Values {
            step: SingleStatistic;
            board: SingleStatistic;
            flywheels: SingleStatistic[];
        }

        export interface FlywheelStatistics {
            values: Values[];
            size: number;
        }
    }
}
