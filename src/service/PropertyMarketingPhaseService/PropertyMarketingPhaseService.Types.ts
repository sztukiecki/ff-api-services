import { Captions } from '@flowfact/types';

export namespace PropertyMarketingPhaseServiceTypes {
    export interface Widget {
        id: string;
        metadata: { [key: string]: any };
        type: string;
    }

    export interface Step {
        captions: Captions;
        completed: {
            value: boolean;
            timestamp: number;
        };
        id: string;
        position: number;
        widgets: Widget[];
    }

    export interface Phase {
        captions: Captions;
        id: string;
        name: string;
        position: number;
        steps: Step[];
        widgets: Widget[];
    }

    export interface PhasesResponse {
        phases: Phase[];
        transactionValidations: any[];
        widgets: Widget[];
    }
}
