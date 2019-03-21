import { APIClient, APIMapping } from '../http';
import Phase from '../models/Phase';
import Flywheel from '../models/Flywheel';
import { AxiosResponse } from 'axios';

type Filter = ExcludeStepsFilter |
    ExcludeKanbansFilter |
    SchemaIdFilter |
    ExcludeCustomerFilter |
    ExcludeMasterFilter;

interface ExcludeStepsFilter {
    type: 'EXCLUDE_PHASE_STEPS';
}

interface ExcludeKanbansFilter {
    type: 'EXCLUDE_PHASE_NON_STEPS';
}

interface SchemaIdFilter {
    type: 'MATCH_SCHEMA_ID';
    data: {
        schemaId: string;
    };
}

interface ExcludeCustomerFilter {
    type: 'EXCLUDE_CUSTOMER';
}

interface ExcludeMasterFilter {
    type: 'EXCLUDE_MASTER';
}

export class FlywheelService extends APIClient {

    constructor() {
        super(APIMapping.flywheelService);
    }

    /**
     * Creates a new flywheel based on the title
     * @param title
     */
    async createFlywheel(title: string): Promise<AxiosResponse> {
        return this.invokeApi<Flywheel>('/flywheels', 'POST', {
            title: title
        });
    }

    /**
     * Deletes a flywheel based on the name (id)
     * @param flywheelName
     */
    async deleteFlywheel(flywheelName: string): Promise<AxiosResponse> {
        return this.invokeApi(`/flywheels/${flywheelName}`, 'DELETE');
    }

    /**
     * TODO: Please comment this method
     * Returns all flywheels with no param given or no-content
     */
    async fetchAllFlywheels(): Promise<AxiosResponse> {
        return this.invokeApi<Flywheel[]>('/flywheels', 'GET');
    }

    /**
     * only for dev
     * @deprecated
     */
    async fetchAllMocks(): Promise<AxiosResponse> {
        return this.invokeApi<Flywheel[]>('/flywheels/mockAll', 'GET');
    }

    /**
     * Return a specific flywheel by name or not-found
     * @param flywheelName
     */
    async fetchFlywheel(flywheelName: string): Promise<AxiosResponse> {
        return this.invokeApi<Flywheel>(`/flywheels/${flywheelName}`);
    }

    /**
     * TODO: Please comment this method
     * Returns all phases which have childrens
     */
    async fetchAllKanbans(): Promise<AxiosResponse> {
        return this.invokeApi<Phase[]>('/phases', 'GET', undefined, {
            queryParams: {
                filters: JSON.stringify({
                    type: 'EXCLUDE_PHASE_STEPS'
                })
            }
        });
    }

    /**
     * TODO: Please comment this method
     * @param filters
     */
    async fetchAllPhases(filters?: Filter[]): Promise<AxiosResponse> {
        const params: any = {};
        if (filters) {
            params.queryParams = {
                filters: JSON.stringify(filters)
            };
        }
        return this.invokeApi<Phase[]>('/phases', 'GET', undefined, params);
    }

    /**
     * Return a specific phase with all subphases
     * @param phaseName
     */
    async fetchPhase(phaseName: string): Promise<AxiosResponse> {
        return this.invokeApi<Phase>(`/phases/${phaseName}`);
    }

    /**
     * Return all transactions for a specific phase
     * @param phaseName
     */
    async fetchTransactionsForPhase(phaseName: string, view: string  = 'card'): Promise<AxiosResponse> {
        return this.invokeApi(`/transactions/phases/${phaseName}?view=${view}`);
    }

    /**
     * Moves a transaction to another phase
     * @param transactionId
     * @param fromPhaseName
     * @param toPhaseName
     */
    async moveTransaction(transactionId: string, fromPhaseName: string, toPhaseName: string): Promise<AxiosResponse> {
        return this.invokeApi(`/transactions/${transactionId}`, 'PUT', {fromPhaseName, toPhaseName});
    }

    /**
     * Creates or updates a phase.
     * @param phase
     */
    async createPhase(phase: object): Promise<AxiosResponse> {
        return this.invokeApi('/phases', 'POST', phase);
    }

    /**
     * TODO: Please comment this method
     * @param phase
     */
    async updatePhase(phase: object): Promise<AxiosResponse> {
        return this.invokeApi('/phases', 'PUT', phase, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    /**
     * TODO: Please comment this method
     * @param phaseName
     */
    async deletePhase(phaseName: string): Promise<AxiosResponse> {
        return this.invokeApi(`/phases/${phaseName}`, 'DELETE');
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
                phaseNames: phaseNames
            }],
            {
                headers: {
                    'Content-Type': 'application/json-patch+json'
                }
            }
        );
    }

    /**
     * TODO: Please comment this method
     * @param transactionId
     */
    async exitPhase(transactionId: number) {
        return this.invokeApi(
            `/transactions/${transactionId}`, 'PATCH',
            [{
                op: 'exitPhase'
            }],
            {
                headers: {
                    'Content-Type': 'application/json-patch+json'
                }
            }
        );
    }

    /**
     * TODO: Please comment this method
     * @param transactionId
     * @param entityId
     * @param targetPhase
     */
    async linkTransaction(transactionId: number, entityId: string, targetPhase: number) {
        return this.invokeApi(
            `/transactions/${transactionId}`, 'PATCH',
            [{
                op: 'linkTransaction',
                entityId,
                targetPhase
            }],
            {
                headers: {
                    'Content-Type': 'application/json-patch+json'
                }
            }
        );
    }
}

export default new FlywheelService();
