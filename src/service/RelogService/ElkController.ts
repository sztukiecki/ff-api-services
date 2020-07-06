import { APIClient, APIMapping } from '../../http';
import { FFAdditionalElkData, MandatoryElkData } from './RelogService.Types';

type ElkData = MandatoryElkData & FFAdditionalElkData;

export class ElkController extends APIClient {

    constructor() {
        super(APIMapping.relogService);
    }

    /**
     * TODO: Please comment this method
     * @param logEntry
     */
    async log(logEntry: ElkData) {
        return await this.invokeApiWithErrorHandling('/relog/elk-gelf', 'POST', logEntry);
    }

    /**
     * Here you don't have to pass the userId
     * @param logEntry
     */
    async logInternal(logEntry: ElkData) {
        return await this.invokeApiWithErrorHandling('/internal/relog/elk-gelf', 'POST', logEntry);
    }

    /**
     * TODO: Please comment this method
     * @param logEntries
     */
    async logBatch(logEntries: ElkData[]) {
        return await this.invokeApiWithErrorHandling('/relog/elk-gelf/batch', 'POST', {batch: logEntries});
    }
}
