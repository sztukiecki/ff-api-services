import APIClient from '../http/APIClient';
import { APIMapping } from '../http';
import { AxiosResponse } from 'axios';
import { TrackingEvent } from '@flowfact/types';

export class BehaviourService extends APIClient {
    private events: TrackingEvent[] = [];
    private currentRequest?: Promise<AxiosResponse>;

    constructor() {
        super(APIMapping.behaviourService);
    }

    /**
     * @deprecated
     */
    async trackLogin(): Promise<AxiosResponse> {
        return await this.invokeApi('/users/currentUser/trackLogin', 'GET');
    }

    /**
     * Tracks usage of a feature
     * @param event
     */
    track(event: TrackingEvent) {
        this.events.push(event);
        this.postEvents();
    }

    private postEvents = () => {
        if (this.currentRequest) {
            return;
        }

        const eventBatch = this.events;
        this.events = [];

        this.currentRequest = this.invokeApi('/events', 'POST', {events: eventBatch});
        this.currentRequest.then(this.repostEvents, this.repostEvents);
    }

    private repostEvents = () => {
        this.currentRequest = undefined;
        if (this.events.length > 0) {
            this.postEvents();
        }
    }
}

export default new BehaviourService();
