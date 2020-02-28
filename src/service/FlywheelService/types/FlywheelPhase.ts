import {Captions} from '@flowfact/types';
import {FlowdslConditionUnion} from '@flowfact/node-flowdsl';

export type FlywheelPhase = {
    id: number;
    name: string;
    global: boolean;
    captions: Captions;
    childrenNames: string[];
    schema: string;
    entityAmount: number;
    noStepIfChildless?: boolean;
    flowIds: number[];
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
