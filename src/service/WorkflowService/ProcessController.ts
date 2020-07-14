import { APIClient, APIMapping } from '../../http';
import { WorkflowServiceTypes } from './WorkflowService.Types';
import ProcessInfo = WorkflowServiceTypes.ProcessInfo;
import ProcessRequest = WorkflowServiceTypes.ProcessRequest;
import ProcessEntityRequest = WorkflowServiceTypes.ProcessEntityRequest;

export class ProcessController extends APIClient {
    constructor() {
        super(APIMapping.workflowService);
    }

    /**
     * Returns information about a process
     * @param id
     */
    async fetchProcessInfo(id: string) {
        return this.invokeApiWithErrorHandling<ProcessInfo>(`/process/${id}`, 'GET');
    };

    /**
     * Starts a process by passing in a key and a process request
     * @param key
     * @param processRequest
     */
    async startProcess(key: string, processRequest: ProcessRequest) {
        return this.invokeApiWithErrorHandling<ProcessInfo>(`/process/${key}`, 'POST', processRequest);
    };

    /**
     * Creates a workflow by it's id´s on several entities.
     * @param workflowId
     * @param processRequest
     */
    async createWorkflowOnSeveralEntities (workflowId: string, processRequest: ProcessEntityRequest) {
        return this.invokeApiWithErrorHandling<ProcessInfo>(`/process/${workflowId}/entities`, 'POST', processRequest);
    };
}
