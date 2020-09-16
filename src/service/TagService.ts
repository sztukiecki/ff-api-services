import { APIClient, APIMapping } from '../http';

export class TagService extends APIClient {
    constructor() {
        super(APIMapping.tagService);
    }

    /**
     * TODO: Please comment this method
     */
    async fetchAllTags() {
        return await this.invokeApi('/tags', 'GET').then((s) => s.data);
    }

    /**
     * TODO: Please comment this method
     * @param body
     */
    async createTag(body: any) {
        return await this.invokeApi('/tags', 'POST', body).then((s) => s.data);
    }

    /**
     * TODO: Please comment this method
     * @param id
     */
    async fetchTagById(id: string) {
        return await this.invokeApi(`/tags/${id}`, 'GET').then((s) => s.data);
    }

    /**
     * TODO: Please comment this method
     * @param body
     * @param id
     */
    async updateTag(body: any, id: string) {
        return await this.invokeApi(`/tags/${id}`, 'PUT', body).then((s) => s.data);
    }
}

export default new TagService();
