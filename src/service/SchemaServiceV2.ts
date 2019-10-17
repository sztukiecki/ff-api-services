import { Extension, GroupAllResponse, GroupV2, SchemaV2 } from '@flowfact/types';
import { AxiosResponse } from 'axios';
import { APIClient, APIMapping } from '../http';

const v2Header = { headers: { 'x-ff-version': 2 } };

export class SchemaServiceV2 extends APIClient {

    constructor() {
        super(APIMapping.schemaService);
    }

    /**
     * Creates a schema. Also needed groups are created if not existent.
     * @param schema - The schema that should be created
     */
    createSchema = async (schema: SchemaV2): Promise<AxiosResponse<SchemaV2>> => {
        return this.invokeApi('/v2/schemas', 'POST', schema);
    };

    /**
     * Returns all schemas
     * @param group - Filters all schemas for given group name.
     * @param size - Page size of the response.
     * @param page - Page number of the response.
     * @param extensions - Extensions that should be added to the schema
     */
    fetchAllSchemas = async (group?: string, size?: number, page?: number, extensions = 'all'): Promise<AxiosResponse<SchemaV2[]>> => {
        let queryParams: any = {};
        if (group) {
            queryParams.group = group;
        }
        if (size) {
            queryParams.size = size;
        }
        if (page) {
            queryParams.page = page;
        }
        if (extensions) {
            queryParams.extensions = extensions;
        }
        return this.invokeApi(`/v2/schemas`, 'GET', undefined, { queryParams });
    };

    /**
     * Deletes a schema
     * @param schemaId - A schema's id or schemaname
     */
    deleteSchema = async (schemaId: string): Promise<AxiosResponse> => {
        return this.invokeApi(`/v2/schemas/${schemaId}`, 'DELETE');
    };

    /**
     * Updates a schema. Also needed groups are created if not existent.
     * @param schema - The schema to be updated
     */
    updateSchema = async (schema: SchemaV2): Promise<AxiosResponse<SchemaV2>> => {
        return this.invokeApi(`/v2/schemas/${schema.id}`, 'PUT', schema);
    };

    /**
     * @typedef {Object} FetchSchemaByIdOrNameQueryParam
     * @property {boolean} resolveGroup
     */

    /**
     * Returns a schema
     * @param schemaIdOrName - The schema's id or schema name
     * @param {FetchSchemaByIdOrNameQueryParam} queryParams - resolves groups, like estates, to hist children - Default value : false
     */
    fetchSchemaByIdOrName = async (schemaIdOrName: string, queryParams: { resolveGroup?: boolean , extensions?: string } = {extensions: 'all'}): Promise<AxiosResponse<SchemaV2>> => {
        return this.invokeApi(`/v2/schemas/${schemaIdOrName}`, 'GET', undefined, { queryParams });
    };

    /**
     * Checks if schema exists, returns id if so
     * @param schemaName - The schema's name
     */
    exists = async (schemaName: string): Promise<AxiosResponse<string>> => {
        return this.invokeApi(`/v2/schemas/${schemaName}/exists`, 'GET');
    };

    /**
     * Adds a value to schema
     * @param schemaName - Identifies the schema
     * @param fieldName - Identifies the field name
     * @param value - The value that should be added
     */
    addSchemaFields = async (schemaName: string, fieldName: string, value: any): Promise<AxiosResponse> => {
        return this.invokeApi(`/v2/schemas/${schemaName}/fields/${fieldName}/possiblevalues`, 'POST', value);
    };

    /**
     * Deletes all schemas in current company scope
     * @param {string} key - if you are sure you want delete all schemas then set key = DELETE
     */
    deleteAllSchema = async (key: string): Promise<AxiosResponse> => {
        if (!key || key !== 'DELETE') {
            return Promise.reject('you need to set key = DELETE if you are sure you want delete all schemas');
        }
        return this.invokeApi(`/v2/schemas/deleteAll?key=${key}`, 'DELETE');
    };

    /**
     * Resolves all indices for a given identifier
     * @param identifier - Id for groups and schemas
     */
    resolveIndices = async (identifier: string): Promise<AxiosResponse<string[]>> => {
        return this.invokeApi(`/v2/schemas/resolveIndices?identifier=${identifier}`, 'GET');
    };

    /**
     * Resolves the given name
     * @param schemaName - A name of a schema
     */
    resolveName = async (schemaName: string): Promise<AxiosResponse<string>> => {
        return this.invokeApi(`/v2/schemas/resolveName?name=${schemaName}`, 'GET');
    };

    /* -- Schema groups */

    /**
     * Returns all groups
     */
    getAllGroups = async (): Promise<AxiosResponse<GroupAllResponse>> => {
        return this.invokeApi(`/groups/`, 'GET', undefined, v2Header);
    };

    /**
     * Creates a schema group
     * @param group - The group that should be created
     */
    createGroup = async (group: GroupV2): Promise<AxiosResponse<string>> => {
        return this.invokeApi(`/groups/`, 'POST', group, v2Header);
    };

    /**
     * Updates a schema group
     * @param group - The group that should be updated
     */
    updateGroup = async (group: GroupV2): Promise<AxiosResponse<GroupV2>> => {
        return this.invokeApi(`/groups/${group.id}`, 'PUT', group, v2Header);
    };

    /**
     * Retrieves a schema group by it's identifier (id or name)
     * @param identifier - The schema groups identifier (id or name)
     */
    fetchGroupByIdentifier = async (identifier: string): Promise<AxiosResponse<GroupV2>> => {
        return this.invokeApi(`/groups/${identifier}`, 'GET', undefined, v2Header);
    };

    /**
     * Deletes a schema group by it's identifier (id or name)
     * @param identifier - The schema groups identifier (id or name)
     */
    deleteGroupById = async (identifier: string): Promise<AxiosResponse> => {
        return this.invokeApi(`/groups/${identifier}`, 'DELETE', undefined, v2Header);
    };

    /**
     * Tells you if the given identifier belongs to a group
     * @param identifier - The schema groups identifier (id or name)
     */
    isGroup = async (identifier: string): Promise<AxiosResponse> => {
        return this.invokeApi(`/groups/${identifier}/is-group`, 'GET', undefined, v2Header);
    };

    // Extension Controller
    /**
     * Fetches all extensions.
     */
    fetchExtensions = async (): Promise<AxiosResponse> => {
        return this.invokeApi(`/extensions`, 'GET', undefined, v2Header);
    };

    /**
     * Fetches extension by name.
     * @Param {string} name - The extenion's name.
     */
    fetchExtension = async (name: string): Promise<AxiosResponse> => {
        return this.invokeApi(`/extensions/${name}`, 'GET', undefined, v2Header);
    };

    /**
     * Create or Updates extension by name.
     * @Param {string} name - The extension's name.
     * @Param {Extension} extension - The extension object, that should be created or updated.
     */
    createOrUpdateExtension = async (name: string, extension: Extension): Promise<AxiosResponse> => {
        return this.invokeApi(`/extensions/${name}`, 'PUT', extension, v2Header);
    };

    /**
     * Deletes extension by name.
     * @Param {string} name - The extension's name.
     */
    deleteExtension = async (name: string): Promise<AxiosResponse> => {
        return this.invokeApi(`/extensions/${name}`, 'DELETE', undefined, v2Header);
    };

    /**
     * Fetches all extensions for a specific combination of schema and company.
     * @param {string} schemaName - The schema name
     */
    fetchExtensionsBySchema = async (schemaName: string): Promise<AxiosResponse> => {
        return this.invokeApi(`/extensions/schemas/${schemaName}`, 'GET', undefined, v2Header);
    };

    // Extension-Assignment-Controller
    /**
     * Fetches stats overs all assigned extensions.
     */
    fetchExtensionAssignments = async (): Promise<AxiosResponse> => {
        return this.invokeApi(`/extensions/assignments`, 'GET', undefined, v2Header);
    };

    /**
     * Assigns extension by name of a extension.
     * It will be assigned to the schemas, which are mentioned within the extension and nowhere else.
     * @Param {string} name - The extension's name.
     */
    addExtensionAssignment = async (name: string): Promise<AxiosResponse> => {
        return this.invokeApi(`/extensions/assignments/${name}`, 'POST', undefined, v2Header);
    };

    /**
     * Revokes assignment of an extension by its name.
     * @Param {string} name - The extension's name.
     */
    removeExtensionAssignment = async (name: string): Promise<AxiosResponse> => {
        return this.invokeApi(`/extensions/assignments/${name}`, 'DELETE', undefined, v2Header);
    };
}

export default new SchemaServiceV2();
