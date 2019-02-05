import { APIClient, APIMapping } from '../http';
import Phase from '../models/Phase';
import Flywheel from '../models/Flywheel';

export class FlywheelService extends APIClient {

    constructor() {
        super(APIMapping.flywheelService);
    }

    /**
     * Returns all flywheels with no param given or no-content
     */
    async fetchAllFlywheels() {
        return this.invokeApi<Flywheel[]>('/flywheel', 'GET');
    }

    /**
     * Return a specific flywheel by name or not-found
     * @param flywheelName
     */
    async fetchFlywheel(flywheelName: string) {
        return this.invokeApi<Flywheel>(`/flywheel/${flywheelName}`);
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
