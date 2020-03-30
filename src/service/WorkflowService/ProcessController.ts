import { APIClient, APIMapping } from '../../http';
import { WorkflowServiceTypes } from './WorkflowService.Types';
import ProcessInfo = WorkflowServiceTypes.ProcessInfo;
import ProcessRequest = WorkflowServiceTypes.ProcessRequest;

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
}
