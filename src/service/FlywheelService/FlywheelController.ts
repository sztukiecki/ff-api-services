import {APIClient, APIMapping} from '../../http';
import {AxiosResponse} from 'axios';
import {Flywheel} from '@flowfact/types';

export class FlywheelController extends APIClient {
    constructor() {
        super(APIMapping.flywheelService);
    }

    /**
     * Creates a new flywheel based on the title
     * @param title
     */
    async create(title: string): Promise<AxiosResponse> {
        return this.invokeApi<Flywheel>('/flywheels', 'POST', {
            title: title,
        });
    }

    /**
     * Deletes a flywheel based on the name (id)
     * @param flywheelName
     */
    async delete(flywheelName: string): Promise<AxiosResponse> {
        return this.invokeApi(`/flywheels/${flywheelName}`, 'DELETE');
    }

    /**
     * TODO: Please comment this method
     * Returns all flywheels with no param given or no-content
     */
    async fetchAll(): Promise<AxiosResponse<Flywheel[]>> {
        return this.invokeApi<Flywheel[]>('/flywheels', 'GET');
    }


    /**
     * Return a specific flywheel by name or not-found
     * @param flywheelName
     */
    async fetch(flywheelName: string): Promise<AxiosResponse<Flywheel>> {
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
