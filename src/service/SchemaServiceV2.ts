import { AxiosResponse } from 'axios';
import { APIClient, APIMapping } from '../http';

export interface Interface {

}

export class SchemaServiceV2 extends APIClient {
    constructor() {
        super(APIMapping.schemaService);
    }

    /**
     * A schema it creates. Also needed groups are created if not existent.
     * @param schema - The schema that should be created
     */
    createSchema = async (schema: any): Promise<AxiosResponse> => {
        return this.invokeApi('/v2/schemas', 'POST', schema);
    }

    /**
     * Returns all schemas
     * @param withGroups - Filters all schemas for given group name.
     */
     fetchAllSchemas = async (params: {group?: string} = {}): Promise<AxiosResponse> => {
        return this.invokeApi(`/v2/schemas`, 'GET', undefined, {params});
    }

    /**
     * Deletes a schema
     * @param schemaId - A schema's id or schemaname
     */
    deleteSchema = async (schemaId: string): Promise<AxiosResponse> => {
        return this.invokeApi(`/v2/schemas/${schemaId}`, 'DELETE');
    }

    /**
     * A schema it updates. Also needed groups are created if not existent.
     * @param schema - The schema to be updated
     */
    updateSchema = async (schema: any): Promise<AxiosResponse> => {
        return this.invokeApi(`/v2/schemas/${schema.id}`, 'PUT', schema);
    }

    /**
     * Returns a schema
     * @param schemaIdOrName - The schema's id or schema name
     * @param resolveGroup - resolves groups, like estates, to hist children - Default value : false
     */
    fetchSchemaByIdOrName = async (schemaIdOrName: string, params: {resolveGroup?: boolean } = {}): Promise<AxiosResponse> => {
        return this.invokeApi(`/v2/schemas/${schemaIdOrName}`, 'GET', undefined, {params});
    }

    /**
     * Checks if schema exists, returns id if so
     * @param schemaName - The schema's name
     */
    exists =  async (schemaName: string): Promise<AxiosResponse<string>> => {
        return this.invokeApi(`/v2/schemas/${schemaName}/exists`, 'GET', undefined);
    }

    /**
     * Adds a value to schema
     * @param schemaName - Identifies the schema
     * @param fieldName - Identifies the field name
     * @param value - The value that should be added
     */
    addSchemaFields =  async (schemaName: string, fieldName: string, value: any): Promise<AxiosResponse> => {
        return this.invokeApi(`/v2/schemas/${schemaName}/fields/${fieldName}/possiblevalues`, 'POST', value);
    }

    /**
     * Deletes all schemas in current company scope
     * @param {string} key - if you are sure you want delete all schemas then set key = DELETE
     */
    deleteAllSchema = async (key: string): Promise<AxiosResponse> => {
        if (!key || key !== 'DELETE') {
            return Promise.reject('you need to set key = DELETE if you are sure you want delete all schemas');
        }
        return this.invokeApi(`/v2/schemas/deleteAll?key=${key}`, 'DELETE');
    }

    /**
     * Resolves all indices for a given identifier
     * @param identifier - Id for groups and schemas
     */
    resolveIndices = async (identifier: string): Promise<AxiosResponse> => {
        return this.invokeApi(`/v2/schemas/resolveIndices?identifier=${identifier}`, 'GET', undefined);
    }

    /**
     * Resolves the given name
     * @param name - A name of a schema or group
     */
    resolveName = async (name: string): Promise<AxiosResponse<string>> => {
        return this.invokeApi(`/v2/schemas/resolveName?name=${name}`, 'GET', undefined);
    }
}

export default new SchemaServiceV2();
