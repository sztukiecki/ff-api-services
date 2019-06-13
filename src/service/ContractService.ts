import { APIClient, APIMapping } from '../http';

class ContractService extends APIClient {

    constructor() {
        super(APIMapping.contractService);
    }

    /**
     * Get all available template contracts for a specific origin.
     * @param origin
     */
    fetchTemplates = async (origin: 'BOORGBERG' | undefined) => {
        return await this.invokeApi('/templates', 'GET', undefined, {
            queryParams: {
                origin: origin
            }
        });
    };

    /**
     * Download a contract template
     * @param templateId
     */
    downloadTemplate = async (templateId: string) => {
        return await this.invokeApi(`/templates/${templateId}/download`, 'GET', undefined, {
            responseType: 'arraybuffer'
        });
    }
}

export default new ContractService();