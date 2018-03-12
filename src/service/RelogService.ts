import {APIClient, APIMapping} from '../http';
import { AxiosResponse } from 'axios';

export interface MandatoryElkData {
    message: string;
    Severity: 'TRACE' | 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';
    SenderName: string;
    SenderVersion: string;
    product: string;
}

export interface FFAdditionalElkData {
    SenderFramework?: string;
    stage?: string;
    facility?: string;
    timestamp?: number;
    requestURI?: string;
    receivedStatusCode?: number;
    sentStatusCode?: number;
    location?: string;
    userId?: string;
    companyId?: string;
    requestId?: string;
}

export type FFElkData = MandatoryElkData & FFAdditionalElkData;

export class RelogService extends APIClient {
    constructor() {
        super(APIMapping.relogService);
    }

    log(logEntry: FFElkData): Promise<AxiosResponse> {
        return this.invokeApi('/relog/elk-gelf', 'POST', logEntry);
    }

    /**
     * Here you don't have to pass the userId
     */
    logInternal(logEntry: FFElkData): Promise<AxiosResponse> {
        return this.invokeApi('/internal/relog/elk-gelf', 'POST', logEntry);
    }

    logBatch(logEntries: FFElkData[]) {
        return this.invokeApi('/relog/elk-gelf/batch', 'POST', {batch: logEntries});
    }
}

export default new RelogService();
