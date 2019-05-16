import { AxiosResponse } from 'axios';
import { APIClient, APIMapping } from '../http';

export class SchemaServiceV2 extends APIClient {
    constructor() {
        super(APIMapping.schemaService);
    }

    /**
     * Creates a schema. Also needed groups are created if not existent.
     * @param schema - The schema that should be created
     */
    async createSchema(schema: any): Promise<AxiosResponse> {
        return this.invokeApi('/v2/schemas', 'POST', schema);
    }

    /**
     * Returns all schemas
     * @param group - Filters all schemas for given group name.
     */
    async fetchAllSchemas(group?: string): Promise<AxiosResponse> {
        let params: any = undefined;
        if (group) {
            params = { group: group };
        }
        return this.invokeApi(`/v2/schemas`, 'GET', undefined, { params });
    }

    /**
     * Deletes a schema
     * @param schemaId - A schema's id or schemaname
     */
    async deleteSchema(schemaId: string): Promise<AxiosResponse> {
        return this.invokeApi(`/v2/schemas/${schemaId}`, 'DELETE');
    }

    /**
     * Updates a schema. Also needed groups are created if not existent.
     * @param schema - The schema to be updated
     */
    async updateSchema(schema: any): Promise<AxiosResponse> {
        return this.invokeApi(`/v2/schemas/${schema.id}`, 'PUT', schema);
    }

    /**
     * Returns a schema
     * @param schemaIdOrName - The schema's id or schema name
     * @param resolveGroup - resolves groups, like estates, to hist children - Default value : false
     */
    async fetchSchemaByIdOrName(schemaIdOrName: string, resolveGroup: boolean = false): Promise<AxiosResponse> {
        let params: any = undefined;
        if (resolveGroup) {
            params = { resolveGroup: resolveGroup.toString() };
        }
        return this.invokeApi(`/v2/schemas/${schemaIdOrName}`, 'GET', undefined, { params });
    }

    /**
     * Checks if schema exists, returns id if so
     * @param schemaName - The schema's name
     */
    async exists(schemaName: string): Promise<AxiosResponse<string>> {
        return this.invokeApi(`/v2/schemas/${schemaName}/exists`, 'GET');
    }

    /**
     * Adds a value to schema
     * @param schemaName - Identifies the schema
     * @param fieldName - Identifies the field name
     * @param value - The value that should be added
     */
    async addSchemaFields(schemaName: string, fieldName: string, value: any): Promise<AxiosResponse> {
        return this.invokeApi(`/v2/schemas/${schemaName}/fields/${fieldName}/possiblevalues`, 'POST', value);
    }

    /**
     * Deletes all schemas in current company scope
     * @param {string} key - if you are sure you want delete all schemas then set key = DELETE
     */
    async deleteAllSchema(key: string): Promise<AxiosResponse> {
        if (!key || key !== 'DELETE') {
            return Promise.reject('you need to set key = DELETE if you are sure you want delete all schemas');
        }
        return this.invokeApi(`/v2/schemas/deleteAll?key=${key}`, 'DELETE');
    }

    /**
     * Resolves all indices for a given identifier
     * @param identifier - Id for groups and schemas
     */
    async resolveIndices(identifier: string): Promise<AxiosResponse> {
        return this.invokeApi(`/v2/schemas/resolveIndices?identifier=${identifier}`, 'GET');
    }

    /**
     * Resolves the given name
     * @param name - A name of a schema or group
     */
    async resolveName(name: string): Promise<AxiosResponse<string>> {
        return this.invokeApi(`/v2/schemas/resolveName?name=${name}`, 'GET');
    }
}

export default new SchemaServiceV2();
