import { APIClient, APIMapping } from '../http';
import { AxiosResponse } from 'axios';

export class FlywheelService extends APIClient {

    constructor() {
        super(APIMapping.flywheelService);
    }

    /**
     * Syntactic sugar for fetching all flywheels
     */
    async fetchAllFlywheels(): Promise<AxiosResponse> {
        return this.fetchFlywheel();
    }

    /**
     * Returns all flywheels with no param given or no-content
     * Return a specific flywheel by name or not-found
     * Use 'mock' as flywheelName to get one mock.
     * Use 'moclAll' as flywheelName to get many mocks.
     * @param flywheelName
     */
    async fetchFlywheel(flywheelName?: string): Promise<AxiosResponse> {
        return this.invokeApi(`/flywheel/${flywheelName}`, 'GET');
    }
}

export default new FlywheelService();