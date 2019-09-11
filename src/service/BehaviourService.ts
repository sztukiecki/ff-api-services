import APIClient from '../http/APIClient';
import { APIMapping } from '../http';
import { TrackingEvent } from '@flowfact/types';

export class BehaviourService extends APIClient {
    private events: TrackingEvent[] = [];
    private timeout?: number;

    constructor() {
        super(APIMapping.behaviourService);
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
        if (this.timeout || this.events.length === 0) {
            return;
        }

        const eventBatch = this.events;
        this.events = [];

        this.invokeApi('/events', 'POST', {events: eventBatch});

        this.timeout = <any> setTimeout(
            () => {
                this.timeout = undefined;
                this.postEvents();
            },
            5000);
    };
}

export default new BehaviourService();
