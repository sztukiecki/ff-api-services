import {APIClient, APIMapping} from '../../http';
import {FlywheelServiceTypes} from './FlywheelService.Types';
import FlywheelPhase = FlywheelServiceTypes.FlywheelPhase;

export class PhaseControllerV2 extends APIClient {
    constructor() {
        super(APIMapping.flywheelService);
    }

    /**
     * Return a specific phase
     * @param phaseName
     */
    async fetch(phaseName: string) {
        return this.invokeApi<FlywheelPhase>(`/phases/${phaseName}`, 'GET', undefined, {
            headers: {
                'x-ff-version': 2
            }
        });
    }

}
