import { APIClient, APIMapping } from '../http';
import Phase from '../models/Phase';
import Flywheel from '../models/Flywheel';

export class FlywheelService extends APIClient {

    constructor() {
        super(APIMapping.flywheelService);
    }

    /**
     * Creates a new flywheel based on the title
     * @param title
     */
    async createFlywheel(title: string) {
        return this.invokeApi<Flywheel>('/flywheels', 'POST', {
            title: title
        });
    }

    /**
     * Deletes a flywheel based on the name (id)
     * @param flywheelName
     */
    async deleteFlywheel(flywheelName: string) {
        return this.invokeApi(`/flywheels/${flywheelName}`, 'DELETE');
    }

    /**
     * Returns all flywheels with no param given or no-content
     */
    async fetchAllFlywheels() {
        return this.invokeApi<Flywheel[]>('/flywheels', 'GET');
    }

    /**
     * only for dev
     */
    async fetchAllMocks() {
        return this.invokeApi<Flywheel[]>('/flywheels/mockAll', 'GET');
    }

    /**
     * Return a specific flywheel by name or not-found
     * @param flywheelName
     */
    async fetchFlywheel(flywheelName: string) {
        return this.invokeApi<Flywheel>(`/flywheels/${flywheelName}`);
    }

    async fetchAllPhases(shortVersion = false) {
        return this.invokeApi<Phase[]>(`/phases`, 'GET', undefined, {
            queryParams: {
                shortVersion: shortVersion
            }
        });
    }

    /**
     * Return a specific phase with all subphases
     * @param phaseName
     */
    async fetchPhase(phaseName: string) {
        return this.invokeApi<Phase>(`/phases/${phaseName}`);
    }
}

export default new FlywheelService();
