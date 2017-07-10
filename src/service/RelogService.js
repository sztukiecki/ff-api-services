import HttpClient, {APIMapping} from '../http';

export default class RelogService {
    static client = new HttpClient(APIMapping.relogService);

    static log(logEntry) {
        return this.client.makeRequestSimple(logEntry, '/relog/elk-gelf', 'POST');
    }

    static logBatch(logEntries) {
        return this.client.makeRequestSimple({_batch: logEntries}, '/relog/elk-gelf/batch', 'POST');
    }
}
