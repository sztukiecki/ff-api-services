import HttpClient, {APIMapping} from '../http';

export default class RelogService {
    static client = new HttpClient(APIMapping.relogService);

    static log(logEntry) {
        return this.client.makeRequestSimple(logEntry, 'log/elk-gelf', 'POST');
    }

    static logBatch(logEntries) {
        return this.client.makeRequestSimple({_batch: logEntries}, 'log/elk-gelf/batch', 'POST');
    }
}
