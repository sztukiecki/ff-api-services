import HttpClient, {APIMapping} from 'http';


export default class ActivityService {

    constructor() {
        this.client = new HttpClient(APIMapping.activityService);
    }

    getAllActivities(page = undefined, size = undefined) {
        let searchQuery = {};
        if (typeof page === 'number' && typeof size === 'number') {
            searchQuery = {
                page: page,
                size: size
            };
        }
        return this.client.makeRequest(searchQuery, '/activities', 'GET').then(s => s.data);
    }

    getActiveActivities(page = undefined, size = undefined) {
        let searchQuery = {};
        if (typeof page === 'number' && typeof size === 'number') {
            searchQuery = {
                page: page,
                size: size
            };
        }
        return this.client.makeRequest(searchQuery, '/activities/active', 'GET').then(s => s.data);
    }

    searchActivities(search, searchQuery = {}, page = undefined, size = undefined) {
        if (search !== null && search.length > 0) {
            searchQuery.q = search;
        } else {
            searchQuery.q = ''; // important, because else the api doesn't even send the body... :(
        }

        if (typeof page === 'number' && typeof size === 'number') {
            searchQuery.page = page;
            searchQuery.size = size;
        }
        return this.client.makeRequetSimple(searchQuery, '/activities/search', 'POST').then(s => s.data);
    }

    getActivityById(id) {
        return this.client.makeRequetSimple({}, `/activities/${id}`, 'GET').then(s => s.data);
    }

    createActivity(body) {
        return this.client.makeRequetSimple(body, '/activities', 'POST').then(s => s.data);
    }

    updateActivity(body) {
        return this.client.makeRequetSimple(body, `/activities/${body.id}`, 'PUT').then(s => s.data);
    }

    deleteActivity(id) {
        return this.client.makeRequetSimple({}, `/activities/${id}`, 'DELETE').then(s => s.data);
    }

}
