import { APIClient, APIMapping } from '../http';

export class PresetService extends APIClient {

    constructor() {
        super(APIMapping.presetService);
    }

    getPresets() {
        return this.invokeApi('/preset', 'GET').then(s => s.data);
    }
}

export default new PresetService();
