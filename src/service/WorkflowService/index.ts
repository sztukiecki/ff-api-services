import { FlowController } from './FlowController';
import { FlowTypeController } from './FlowTypeController';
import { ProcessController } from './ProcessController';

export * from './WorkflowService.Types';

export class WorkflowService {
    public readonly flow: FlowController;
    public readonly flowType: FlowTypeController;
    public readonly process: ProcessController;

    constructor() {
        this.flow = new FlowController();
        this.flowType = new FlowTypeController();
        this.process = new ProcessController();
    }
}

export const WorkflowServiceInstance = new WorkflowService();
