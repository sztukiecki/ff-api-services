import HttpClient, {APIMapping} from 'http';


export default class TagService {

    constructor() {
        this.client = new HttpClient(APIMapping.tagService);
    }


    getAllTags() {
        return this.client.makeRequetSimple({}, '/tags', 'GET').then(s => s.data);
    }

    createTag(body) {
        return this.client.makeRequetSimple(body, '/tags', 'POST').then(s => s.data);
    }

    getTagById(id) {
        return this.client.makeRequetSimple({}, `/tags/${id}`, 'GET').then(s => s.data);
    }

    updateTag(body, id) {
        return this.client.makeRequetSimple(body, `/tags/${id}`, 'PUT').then(s => s.data);
    }
}
