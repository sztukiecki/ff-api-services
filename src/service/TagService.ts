import {APIClient, APIMapping} from '../http';

export class TagService extends APIClient {

    constructor() {
        super(APIMapping.tagService);
    }

    getAllTags() {
        return this.invokeApi('/tags', 'GET').then(s => s.data);
    }

    createTag(body: any) {
        return this.invokeApi('/tags', 'POST', body).then(s => s.data);
    }

    getTagById(id: string) {
        return this.invokeApi(`/tags/${id}`, 'GET').then(s => s.data);
    }

    updateTag(body: any, id: string) {
        return this.invokeApi(`/tags/${id}`, 'PUT', body).then(s => s.data);
    }
}

export default new TagService()
