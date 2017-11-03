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

    getAllSchemas(withGroups: boolean = false) {
        let queryParams: any = {
            transform: true
        };

        if (withGroups) {
            queryParams.groups = 'true';
        }
        return this.invokeApi('/schemas', 'GET', undefined, {queryParams});
    }

    getDataBySchemaId(schemaId: string, page: number = 1, size?: number) {
        let queryParams: any = {
            page: page.toString(),
        };
        if (size) {
            queryParams.size = size.toString();
        }
        return this.invokeApi(`/data/${schemaId}`, 'GET', undefined, {queryParams});
    }

    getSchema(schemaId: string, queryParams: any = {}) {
        queryParams.transform = true;
        return this.invokeApi(`/schemas/${schemaId}`, 'GET', undefined, {queryParams});
    }

    createSchema(schema: any) {
        return this.invokeApi('/schemas?transform=true', 'POST', schema);
    }

    deleteSchema(schemaId: string) {
        return this.invokeApi(`/schemas/${schemaId}`, 'DELETE');
    }

    updateSchema(schema: any) {
        return this.invokeApi(`/schemas/${schema.id}?transform=true`, 'PUT', schema);
    }

    getIntegrationsForSchema(schemaId: string) {
        return this.invokeApi(`/integrations?schemaId=${schemaId}&transform=true`, 'GET');
    }

    createIntegrationForSchema(schemaId: string, label: string) {
        const integration = {
            schemaId, label
        };
        return this.invokeApi('/integrations?transform=true', 'POST', integration);
    }

    updateIntegration(integrationId: string, data: any) {
        return this.invokeApi(`/integrations/${integrationId}/formdata?transform=true`, 'POST', data);
    }

    deleteIntegration(integrationId: string) {
        return this.invokeApi(`/integrations/${integrationId}`, 'DELETE');
    }

    getResponseForIntegrationGetUrlByUrl(url: string) {
        return this.invokeApi(url, 'GET');
    }

    getResponseForIntegrationGetUrlById(integrationId: string) {
        return this.invokeApi(`/integrations/${integrationId}/data`, 'GET');
    }
}

export default new SchemaService();
