import HttpClient, {APIMapping} from '../http';

export default class TagService {

    static client = new HttpClient(APIMapping.tagService);

    static getAllTags() {
        return this.client.makeRequestSimple({}, '/tags', 'GET').then(s => s.data);
    }

    static createTag(body) {
        return this.client.makeRequestSimple(body, '/tags', 'POST').then(s => s.data);
    }

    static getTagById(id) {
        return this.client.makeRequestSimple({}, `/tags/${id}`, 'GET').then(s => s.data);
    }

    static updateTag(body, id) {
        return this.client.makeRequestSimple(body, `/tags/${id}`, 'PUT').then(s => s.data);
    }
}
