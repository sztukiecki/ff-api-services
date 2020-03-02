import {APIClient, APIMapping} from '../../http';
import {FlywheelServiceTypes} from './FlywheelService.Types';
import FlywheelFilter = FlywheelServiceTypes.FlywheelFilter;
import FlywheelPhase = FlywheelServiceTypes.FlywheelPhase;
import FlywheelPhaseTree = FlywheelServiceTypes.FlywheelPhaseTree;
import PhaseSyncCommands = FlywheelServiceTypes.PhaseSyncCommands;

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
    async fetchAll(filters?: FlywheelFilter[]) {
        const params: any = {};
        if (filters) {
            params.queryParams = {
                filters: filters ? JSON.stringify(filters) : this.defaultFilter,
            };
        }
        return this.invokeApi<FlywheelPhase[]>('/phases', 'GET', undefined, params);
    }

    /**
     * Return a specific phase with all subphases
     * @param phaseName
     */
    async fetch(phaseName: string) {
        return this.invokeApi<FlywheelPhaseTree>(`/phases/${phaseName}`);
    }


    /**
     * Creates or updates a phase.
     * @param phase
     */
    async create(phase: FlywheelPhase) {
        return this.invokeApi<FlywheelPhase>('/phases', 'POST', phase);
    }

    /**
     * TODO: Please comment this method
     * @param phaseName
     * @param command
     */
    async sync(phaseName: string, command: PhaseSyncCommands) {
        return this.invokeApi(`/phases/${phaseName}`, 'POST', undefined, {
            queryParams: {
                command
            }
        });
    }

    /**
     * TODO: Please comment this method
     * @param phase
     */
    async update(phase: FlywheelPhase) {
        return this.invokeApi<FlywheelPhase>('/phases', 'PUT', phase, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    /**
     * TODO: Please comment this method
     * @param phaseName
     */
    async delete(phaseName: string) {
        return this.invokeApi(`/phases/${phaseName}`, 'DELETE');
    }

}
