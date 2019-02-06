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
     * Returns all flywheels with no param given or no-content
     */
    async fetchAllFlywheels() {
        return this.invokeApi<Flywheel[]>('/flywheels', 'GET');
    }

    /**
     * Return a specific flywheel by name or not-found
     * @param flywheelName
     */
    async fetchFlywheel(flywheelName: string) {
        return this.invokeApi<Flywheel>(`/flywheels/${flywheelName}`);
    }

    /**
     * Return a specific phase with all subphases
     * @param phaseName
     */
    async fetchPhase(phaseName: string) {
        return this.invokeApi<Phase>(`/phase/${phaseName}`);
    }
}

export default new FlywheelService();
