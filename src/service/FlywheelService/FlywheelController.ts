import { APIClient, APIMapping } from '../../http';
import { FlywheelServiceTypes } from './FlywheelService.Types';
import Flywheel = FlywheelServiceTypes.Flywheel;
import FlywheelStatisticTypes = FlywheelServiceTypes.FlywheelStatisticTypes;
import Transaction = FlywheelServiceTypes.Transaction;

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
    async fetchAll() {
        return this.invokeApiWithErrorHandling<Flywheel[]>('/flywheels', 'GET');
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
            `/flywheels/${flywheelName}`,
            'PATCH',
            [
                {
                    op: 'set-phases',
                    phaseNames: phaseNames,
                },
            ],
            {
                headers: {
                    'Content-Type': 'application/json-patch+json',
                },
            }
        );
    }

    /**
     * Fetch statistics for a given entityId
     * @param entityId
     */
    async fetchStatistics(entityId: string) {
        return this.invokeApiWithErrorHandling<FlywheelStatisticTypes.FlywheelStatistics>(`/flywheel-statistics/entity/${entityId}`, 'GET');
    }

    /**
     * Fetch transactions for a given entityId
     * @param entityId
     */
    async fetchTransactions(entityId: string) {
        return this.invokeApiWithErrorHandling<Transaction[]>(`/transactions/entities/${entityId}`, 'GET');
    }

    /**
     * Fetch transactions for a given entityId in a flywheel with flywheelName
     * @param entityId
     * @param flywheelName
     */
    async fetchTransactionsInFlywheel(entityId: string, flywheelName: string) {
        return this.invokeApiWithErrorHandling<Transaction[]>(`/transactions/entities/${entityId}/flywheel/${flywheelName}`, 'GET');
    }

    /**
     * Create a transaction for a given entityId in a given phase. Returns the created transaction
     * @param entityId
     * @param phaseName
     */
    async createTransaction(entityId: string, phaseName: string) {
        return this.invokeApiWithErrorHandling<Transaction>(`/transactions/entities/${entityId}`, 'POST', {
            phaseName,
        });
    }
}
