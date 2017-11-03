import {APIClient, APIMapping} from '../http';

export class ActivityService extends APIClient {

    constructor() {
        super(APIMapping.activityService);
    }

    getAllActivities(page?: number, size?: number) {
        let searchQuery = {};
        if (typeof page === 'number' && typeof size === 'number') {
            searchQuery = {
                page: page,
                size: size
            };
        }
        return this.invokeApi('/activities', 'GET').then(s => s.data);
    }

    getActiveActivities(page?: number, size?: number) {
        let searchQuery = {};
        if (typeof page === 'number' && typeof size === 'number') {
            searchQuery = {
                page: page,
                size: size
            };
        }
        return this.invokeApi('/activities/active', 'GET').then(s => s.data);
    }

    searchActivities(search: string, searchQuery: any = {}, page?: number, size?: number) {
        if (search !== null && search.length > 0) {
            searchQuery.q = search;
        } else {
            searchQuery.q = ''; // important, because else the api doesn't even send the body... :(
        }

        if (typeof page === 'number' && typeof size === 'number') {
            searchQuery.page = page;
            searchQuery.size = size;
        }
        return this.invokeApi('/activities/search', 'POST', searchQuery).then(s => s.data);
    }

    getActivityById(id: string) {
        return this.invokeApi(`/activities/${id}`, 'GET').then(s => s.data);
    }

    createActivity(body: any) {
        return this.invokeApi('/activities', 'POST', body).then(s => s.data);
    }

    updateActivity(body: any) {
        return this.invokeApi(`/activities/${body.id}`, 'PUT', body).then(s => s.data);
    }

    deleteActivity(id: string) {
        return this.invokeApi(`/activities/${id}`, 'DELETE').then(s => s.data);
    }
}

export default new ActivityService();
