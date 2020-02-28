import {APIClient, APIMapping} from '../../http';
import {AxiosResponse} from 'axios';
import {Phase} from '@flowfact/types';

export class PhaseControllerV2 extends APIClient {
    constructor() {
        super(APIMapping.flywheelService);
    }

    /**
     * Return a specific phase
     * @param phaseName
     */
    async fetch(phaseName: string): Promise<AxiosResponse> {
        return this.invokeApi<Phase>(`/phases/${phaseName}`, 'GET', undefined, {
            headers: {
                'x-ff-version': 2
            }
        });
    }

}
