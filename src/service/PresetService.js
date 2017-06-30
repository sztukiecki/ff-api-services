import HttpClient, {APIMapping} from '../http';

export default class PresetService {

    static client = new HttpClient(APIMapping.presetService);

    static getPresets() {
        return this.client.makeRequestSimple({}, '/preset', 'GET').then(s => s.data);
    }
}
