export namespace WorkflowServiceTypes {

    export interface Workflows {
        workflows: Workflow[];
    }

    export type Workflow = {
        id: string;
        name: string;
        active: boolean;
        step: WorkflowStep;
        stats?: WorkflowStats;
    };

    export interface WorkflowStep {
        comment?: string;
        configuration?: {
            [key: string]: any;
        };
        startAt?: string;
        states: WorkflowStates;
    }

    export type WorkflowStats = {
        runningInstances: number;
        incidents: number;
    };

    export interface WorkflowNode {
        type: string;
        next?: string;
        end?: boolean;
        branches?: WorkflowStep[];
        configuration?: {
            [key: string]: any;
        };
    }

    export interface WorkflowStates {
        [key: string]: WorkflowNode;
    }

    export interface WorkflowPatchRequest {
        id: string;
        patch: [{
            op: string;
            path: string;
            value: string;
        }];
    }

    export interface WorkflowPatchResult {
        id: string;
        success: boolean;
        flow?: Workflow;
        error?: {
            type: string;
            description: string;
            additionalInfo: string
        };
    }

    export interface WorkflowMultiPatchRequest {
        patches: WorkflowPatchRequest[];
    }

    export interface WorkflowMultiPatchResult {
        results: WorkflowPatchResult[];
    }

    export interface Templates {
        templates: Template[];
    }

    export interface Template {
        templateName: string,
        title?: string,
        description?: string,
        actionType: string,
        created?: number,
        parameters: { [key: string]: any }
    }

    export interface AllTypesResponse {
        actions: string[];
        conditions: string[];
    }

    export interface ProcessInfo {
        id: string;
        isSuspended: boolean;
        isEnded: boolean;
        href: string;
    }

    export interface ProcessRequest {
        attributes: { [key: string]: any };
    }

}
