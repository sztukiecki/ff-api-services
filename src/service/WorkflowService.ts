import { AxiosResponse } from 'axios';
import { APIClient, APIMapping } from '../http';
import { Workflow } from '@flowfact/types';

class WorkflowService extends APIClient {

    constructor() {
        super(APIMapping.workflowService);
    }

    fetchAvailableConditions = async (): Promise<AxiosResponse<String[]>> => {
        return await this.invokeApi('/action/ids', 'GET', undefined, {
            queryParams: {
                type: 'condition'
            }
        });
    };

    fetchAvailableActions = async (): Promise<AxiosResponse<String[]>> => {
        return await this.invokeApi('/action/ids', 'GET', undefined, {
            queryParams: {
                type: 'action'
            }
        });
    };

    /**
     * Fetch all available templates
     */
    fetchTemplates = async (): Promise<AxiosResponse> => {
        return await this.invokeApi('/flow-type/templates', 'GET');
    };

    /**
     * Fetches a specific workflow
     * @param workflowId
     *  The id of the workflow
     */
    fetchWorkflow = async (workflowId: string): Promise<AxiosResponse<Workflow>> => {
        return await this.invokeApi(`/flow/${workflowId}`, 'GET');
    };

    /**
     * Creates a workflow by his name.
     */
    createWorkflow = async (workflow: Workflow): Promise<AxiosResponse<Workflow>> => {
        return await this.invokeApi('/flow', 'POST', workflow);
    };

    /**
     * Updates a workflow by his id.
     * @param workflowId
     * @param workflow
     */
    updateWorkflow = async (workflowId: string, workflow: Workflow): Promise<AxiosResponse<Workflow>> => {
        return await this.invokeApi(`/flow/${workflowId}`, 'PUT', workflow);
    }
}

export default new WorkflowService();
