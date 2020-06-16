import {APIClient, APIMapping} from '../../http';
import {FlywheelServiceTypes} from './FlywheelService.Types';
import Flywheel = FlywheelServiceTypes.Flywheel;

export class FlywheelController extends APIClient {
    constructor() {
        super(APIMapping.flywheelService);
    }

    /**
     * Creates a new flywheel based on the title
     * @param title
     */
    async create(title: string) {
        return this.invokeApiWithErrorHandling<Flywheel>('/flywheels', 'POST', {
            title: title,
        });
    }

    /**
     * Deletes a flywheel based on the name (id)
     * @param flywheelName
     */
    async delete(flywheelName: string) {
        return this.invokeApiWithErrorHandling(`/flywheels/${flywheelName}`, 'DELETE');
    }

    /**
     * TODO: Please comment this method
     * Returns all flywheels with no param given or no-content
     */
    async fetchAll(page = 0) {
        return this.invokeApiWithErrorHandling<Flywheel[]>(`/flywheels?page=${page}`, 'GET');
    }


    /**
     * Return a specific flywheel by name or not-found
     * @param flywheelName
     */
    async fetch(flywheelName: string) {
        return this.invokeApiWithErrorHandling<Flywheel>(`/flywheels/${flywheelName}`);
    }

    /**
     * TODO: Please comment this method
     * @param flywheelName
     * @param phaseNames
     */
    async updatePhases(flywheelName: string, phaseNames: string[]) {
        return this.invokeApiWithErrorHandling<Flywheel>(
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
