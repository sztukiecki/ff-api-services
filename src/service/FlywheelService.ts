import { APIClient, APIMapping } from '../http';
import Phase from '../models/Phase';
import Flywheel from '../models/Flywheel';
import { AxiosResponse } from 'axios';

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

    async fetchAllPhases(shortVersion: boolean = false) {
        return this.invokeApi<Phase[]>('/phases', 'GET', undefined, {
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

    /**
     * Return all transactions for a specific phase
     * @param phaseName
     */
    async fetchTransactionsForPhase(phaseName: string) {
        return this.invokeApi(`/transactions/phase/${phaseName}`);
    }

    /**
     * Moves a transaction to another phase
     */
    async moveTransaction(transactionId: string, fromPhaseName: string, toPhaseName: string) {
        return this.invokeApi(`/transactions/transaction/${transactionId}`, 'PUT', {fromPhaseName, toPhaseName});
    }

    /*
     * Creates or updates a phase.
     */
    async savePhase(phase: object): Promise<AxiosResponse> {
        return this.invokeApi('/phases', 'POST', phase);
    }

    async deletePhase(phaseName: string): Promise<AxiosResponse> {
        return this.invokeApi(`/phases/${phaseName}`, 'DELETE');
    }
}

export default new FlywheelService();
