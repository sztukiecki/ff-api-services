import HttpClient, {APIMapping} from '../http';

export default class ActivityService {

    static client = new HttpClient(APIMapping.activityService);

    static getAllActivities(page = undefined, size = undefined) {
        let searchQuery = {};
        if (typeof page === 'number' && typeof size === 'number') {
            searchQuery = {
                page: page,
                size: size
            };
        }
        return this.client.makeRequest(searchQuery, '/activities', 'GET').then(s => s.data);
    }

    static getActiveActivities(page = undefined, size = undefined) {
        let searchQuery = {};
        if (typeof page === 'number' && typeof size === 'number') {
            searchQuery = {
                page: page,
                size: size
            };
        }
        return this.client.makeRequest(searchQuery, '/activities/active', 'GET').then(s => s.data);
    }

    static searchActivities(search, searchQuery = {}, page = undefined, size = undefined) {
        if (search !== null && search.length > 0) {
            searchQuery.q = search;
        } else {
            searchQuery.q = ''; // important, because else the api doesn't even send the body... :(
        }

        if (typeof page === 'number' && typeof size === 'number') {
            searchQuery.page = page;
            searchQuery.size = size;
        }
        return this.client.makeRequestSimple(searchQuery, '/activities/search', 'POST').then(s => s.data);
    }

    static getActivityById(id) {
        return this.client.makeRequestSimple({}, `/activities/${id}`, 'GET').then(s => s.data);
    }

    static createActivity(body) {
        return this.client.makeRequestSimple(body, '/activities', 'POST').then(s => s.data);
    }

    static updateActivity(body) {
        return this.client.makeRequestSimple(body, `/activities/${body.id}`, 'PUT').then(s => s.data);
    }

    static deleteActivity(id) {
        return this.client.makeRequestSimple({}, `/activities/${id}`, 'DELETE').then(s => s.data);
    }
}
