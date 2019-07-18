import { AxiosResponse } from 'axios';
import { APIClient, APIMapping } from '../http';

class WorkflowService extends APIClient {

    constructor() {
        super(APIMapping.workflowService);
    }

    fetchAvailableConditions = async(): Promise<AxiosResponse<String[]>> => {
        return await this.invokeApi('/action/ids', 'GET', undefined, {
            queryParams: {
                type: 'condition'
            }
        });
    };

    fetchAvailableActions = async(): Promise<AxiosResponse<String[]>> => {
        return await this.invokeApi('/action/ids', 'GET', undefined, {
            queryParams: {
                type: 'action'
            }
        });
    };

    /**
     * Fetch all available templates
     */
    fetchTemplates = async(): Promise<AxiosResponse> => {
        return await this.invokeApi('/flow-type/templates', 'GET');
    };

    /**
     * Fetches a specific workflow
     * @param workflowId
     *  The id of the workflow
     */
    fetchWorkflow = async(workflowId: string) => {
        return await this.invokeApi(`/flow/${workflowId}`, 'GET');
    }
}

export default new WorkflowService();