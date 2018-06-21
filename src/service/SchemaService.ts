import { APIClient, APIMapping } from '../http';
import { AxiosResponse } from 'axios';

export class SchemaService extends APIClient {
    constructor() {
        super(APIMapping.schemaService);
    }

    loadStats(withGroups: boolean = false): Promise<AxiosResponse> {
        const additionalParams = withGroups ? {queryParams: {groups: 'true'}} : undefined;
        return this.invokeApi('/stats', 'GET', undefined, additionalParams);
    }

    getAllSchemas(withGroups: boolean = false, short: boolean = false): Promise<AxiosResponse> {
        let queryParams: any = {
            transform: true
        };

        if (withGroups) {
            queryParams.groups = 'true';
        }

        if(short) {
            queryParams.short = 'true';
        }

        return this.invokeApi('/schemas', 'GET', undefined, {queryParams});
    }

    getDataBySchemaId(schemaId: string, page: number = 1, size?: number): Promise<AxiosResponse> {
        let queryParams: any = {
            page: page.toString(),
        };
        if (size) {
            queryParams.size = size.toString();
        }
        return this.invokeApi(`/data/${schemaId}`, 'GET', undefined, {queryParams});
    }

    getSchema(schemaId: string, queryParams: any = {}): Promise<AxiosResponse> {
        queryParams.transform = true;
        return this.invokeApi(`/schemas/${schemaId}`, 'GET', undefined, {queryParams});
    }

    createSchema(schema: any): Promise<AxiosResponse> {
        return this.invokeApi('/schemas?transform=true', 'POST', schema);
    }

    deleteSchema(schemaId: string): Promise<AxiosResponse> {
        return this.invokeApi(`/schemas/${schemaId}`, 'DELETE');
    }

    updateSchema(schema: any): Promise<AxiosResponse> {
        return this.invokeApi(`/schemas/${schema.id}?transform=true`, 'PUT', schema);
    }

    getIntegrationsForSchema(schemaId: string): Promise<AxiosResponse> {
        return this.invokeApi(`/integrations?schemaId=${schemaId}&transform=true`, 'GET');
    }

    createIntegrationForSchema(schemaId: string, label: string): Promise<AxiosResponse> {
        const integration = {
            schemaId, label
        };
        return this.invokeApi('/integrations?transform=true', 'POST', integration);
    }

    updateIntegration(integrationId: string, data: any): Promise<AxiosResponse> {
        return this.invokeApi(`/integrations/${integrationId}/formdata?transform=true`, 'POST', data);
    }

    deleteIntegration(integrationId: string): Promise<AxiosResponse> {
        return this.invokeApi(`/integrations/${integrationId}`, 'DELETE');
    }

    getResponseForIntegrationGetUrlByUrl(url: string): Promise<AxiosResponse> {
        return this.invokeApi(url, 'GET');
    }

    getResponseForIntegrationGetUrlById(integrationId: string): Promise<AxiosResponse> {
        return this.invokeApi(`/integrations/${integrationId}/data`, 'GET');
    }

    getAllMembersOfGroup(groupId: string): Promise<AxiosResponse> {
        return this.invokeApi(`/groups/${groupId}/members`, 'GET');
    }
}

export default new SchemaService();
