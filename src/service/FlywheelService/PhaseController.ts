import {APIClient, APIMapping} from '../../http';
import {AxiosResponse} from 'axios';
import {FlywheelFilter, Phase} from '@flowfact/types';

export class PhaseController extends APIClient {
    private defaultFilter: string = JSON.stringify({
        type: 'EXCLUDE_PHASE_STEPS',
    });

    constructor() {
        super(APIMapping.flywheelService);
    }

    /**
     * TODO: Please comment this method
     * @param filters
     */
    async fetchAll(filters?: FlywheelFilter[]): Promise<AxiosResponse> {
        const params: any = {};
        if (filters) {
            params.queryParams = {
                filters: filters ? JSON.stringify(filters) : this.defaultFilter,
            };
        }
        return this.invokeApi<Phase[]>('/phases', 'GET', undefined, params);
    }

    /**
     * Return a specific phase with all subphases
     * @param phaseName
     */
    async fetch(phaseName: string): Promise<AxiosResponse> {
        return this.invokeApi<Phase>(`/phases/${phaseName}`);
    }


    /**
     * Creates or updates a phase.
     * @param phase
     */
    async create(phase: object): Promise<AxiosResponse> {
        return this.invokeApi('/phases', 'POST', phase);
    }

    /**
     * TODO: Please comment this method
     * @param phase
     */
    async update(phase: object): Promise<AxiosResponse> {
        return this.invokeApi('/phases', 'PUT', phase, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    /**
     * TODO: Please comment this method
     * @param phaseName
     */
    async delete(phaseName: string): Promise<AxiosResponse> {
        return this.invokeApi(`/phases/${phaseName}`, 'DELETE');
    }

}
