import {APIClient, APIMapping} from '../../http';
import {Flywheel} from './types';

export class FlywheelController extends APIClient {
    constructor() {
        super(APIMapping.flywheelService);
    }

    /**
     * Creates a new flywheel based on the title
     * @param title
     */
    async create(title: string) {
        return this.invokeApi<Flywheel>('/flywheels', 'POST', {
            title: title,
        });
    }

    /**
     * Deletes a flywheel based on the name (id)
     * @param flywheelName
     */
    async delete(flywheelName: string) {
        return this.invokeApi(`/flywheels/${flywheelName}`, 'DELETE');
    }

    /**
     * TODO: Please comment this method
     * Returns all flywheels with no param given or no-content
     */
    async fetchAll() {
        return this.invokeApi<Flywheel[]>('/flywheels', 'GET');
    }


    /**
     * Return a specific flywheel by name or not-found
     * @param flywheelName
     */
    async fetch(flywheelName: string) {
        return this.invokeApi<Flywheel>(`/flywheels/${flywheelName}`);
    }

    /**
     * TODO: Please comment this method
     * @param flywheelName
     * @param phaseNames
     */
    async updatePhases(flywheelName: string, phaseNames: string[]) {
        return this.invokeApi<Flywheel>(
            `/flywheels/${flywheelName}`, 'PATCH',
            [{
                op: 'set-phases',
                phaseNames: phaseNames,
            }],
            {
                headers: {
                    'Content-Type': 'application/json-patch+json',
                },
            },
        );
    }

}
