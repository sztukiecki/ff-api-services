import {Captions} from '@flowfact/types';
import {FlowdslConditionUnion} from '@flowfact/node-flowdsl';



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


    export type FlywheelPhasePatch = PhasePatch

    export type FlywheelFilter =
        ExcludeStepsFilter |
        ExcludeKanbansFilter |
        SchemaIdFilter |
        ExcludeCustomerFilter |
        ExcludeMasterFilter;

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

    type PhasePatch = {
        op: 'set-import-type',
        value: 'only_new' | 'new_and_old'
    }
}
