import { APIClient, APIMapping } from '../http';
import { AxiosResponse } from 'axios';

export class FlywheelService extends APIClient {

    constructor() {
        super(APIMapping.flywheelService);
    }

    /**
     * Returns all flywheels with no param given or no-content
     */
    async fetchAllFlywheels(): Promise<AxiosResponse> {
        return this.invokeApi('/flywheel', 'GET');
    }

    /**
     * Return a specific flywheel by name or not-found
     * @param flywheelName
     */
    async fetchFlywheel(flywheelName: string): Promise<AxiosResponse> {
        return this.invokeApi(`/flywheel/${flywheelName}`, 'GET');
    }
}

export default new FlywheelService();