import { APIClient, APIMapping } from '../../http';
import { WorkflowServiceTypes } from './WorkflowService.Types';
import Workflow = WorkflowServiceTypes.Workflow;
import Workflows = WorkflowServiceTypes.Workflows;
import WorkflowMultiPatchRequest = WorkflowServiceTypes.WorkflowMultiPatchRequest;
import WorkflowMultiPatchResult = WorkflowServiceTypes.WorkflowMultiPatchResult;
import WorkflowPatchRequest = WorkflowServiceTypes.WorkflowPatchRequest;
import WorkflowPatchResult = WorkflowServiceTypes.WorkflowPatchResult;
import CreateWorkflowRequest = WorkflowServiceTypes.CreateWorkflowRequest;

export class FlowController extends APIClient {
    constructor() {
        super(APIMapping.workflowService);
    }

    /**
     * Fetches a specific workflow by id
     * @param workflowId
     *  The id of the workflow
     * @param withStatistics
     * When set to true it also returns statistics of the workflow
     */
    async fetchWorkflow(workflowId: string, withStatistics: boolean = false) {
        return this.invokeApiWithErrorHandling<Workflow>(`/flow/${workflowId}`, 'GET', undefined, {
            queryParams: {
                stats: withStatistics,
            },
        });
    }

    /**
     * Fetches specific workflows by the given ids. If the array is empty, all workflows will be returned.
     * @param workflowIds
     * @param withStatistics
     * When set to true it also returns statistics of the workflows
     */
    async fetchWorkflows(workflowIds: string[], withStatistics: boolean = false) {
        return this.invokeApiWithErrorHandling<Workflows>(`/flow`, 'GET', undefined, {
            queryParams: {
                ids: workflowIds.join(','),
                stats: withStatistics,
            },
        });
    }

    /**
     * Creates a workflow
     * @param workflow
     */
    async createWorkflow(workflow: CreateWorkflowRequest) {
        return this.invokeApiWithErrorHandling<Workflow>('/flow', 'POST', workflow);
    }

    /**
     * Updates a workflow by it's id.
     * @param workflowId
     * @param workflow
     */
    async updateWorkflow(workflowId: string, workflow: Workflow) {
        return this.invokeApiWithErrorHandling<Workflow>(`/flow/${workflowId}`, 'PUT', workflow);
    }

    /**
     * Deletes a workflow by it's id
     * @param workflowId
     */
    async deleteWorkflow(workflowId: string) {
        return this.invokeApiWithErrorHandling(`/flow/${workflowId}`, 'DELETE');
    }

    /**
     * Patches a single Workflow
     * @param id
     * @param body
     */
    async patchWorkflow(id: string, body: WorkflowPatchRequest) {
        return this.invokeApiWithErrorHandling<WorkflowPatchResult>(`/flow/${id}`, 'PATCH', body);
    }

    /**
     * Patches multiple Workflows
     * @param body
     */
    async patchWorkflows(body: WorkflowMultiPatchRequest) {
        return this.invokeApiWithErrorHandling<WorkflowMultiPatchResult>('/flow', 'PATCH', body);
    }

    /**
     * Duplicate a workflow
     * @param id
     */
    async duplicateWorkflow(id: string) {
        return this.invokeApiWithErrorHandling<Workflow>(`/flow/${id}/duplicate`, 'POST');
    }
}
