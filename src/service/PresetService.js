import HttpClient, {APIMapping} from 'http';

export default class PresetService {

    constructor() {
        this.client = new HttpClient(APIMapping.presetService);
    }

    getPresets() {
        return this.client.makeRequetSimple({}, '/preset', 'GET').then(s => s.data);
    }
}
