import { APIClient, APIMapping } from './http';
import { AxiosResponse } from 'axios';

export class TaggingService extends APIClient {

    constructor() {
        super(APIMapping.taggingService);
    }

    /**
     * Adds a tag into the database and creates a consumable kafka topic.
     * @param body as a tagRequest containing schemaId, entityId, tagName and metadata object.
     */
    async addTag(body: any): Promise<AxiosResponse> {
        return await this.invokeApi('/tag', 'POST', body);
    }
}

export default new TaggingService();