import APIClient from '../http/APIClient';
import { APIMapping } from '../http';
import { AxiosResponse } from 'axios';
import { TrackingEvent } from '@flowfact/types';

export class BehaviourService extends APIClient {
    private events: TrackingEvent[] = [];

    constructor() {
        super(APIMapping.behaviourService);

        setInterval(this.postEvents, 5000);
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
    }

    private postEvents = () => {
        if (this.events.length === 0) {
            return;
        }

        const eventBatch = this.events;
        this.events = [];

        this.invokeApi('/events', 'POST', {events: eventBatch});
    };
}

export default new BehaviourService();
