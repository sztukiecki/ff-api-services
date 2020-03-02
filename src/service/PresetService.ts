import { APIClient, APIMapping } from '../http';

export class PresetService extends APIClient {

    constructor() {
        super(APIMapping.presetService);
    }

    /**
     * TODO: Please comment this method
     */
    async fetchPresets() {
        return await this.invokeApi('/preset', 'GET').then(s => s.data);
    }
}

export default new PresetService();
