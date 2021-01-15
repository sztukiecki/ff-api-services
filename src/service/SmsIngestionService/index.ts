import {SmsIngestionController} from "./SmsIngestionController";

export * from './SmsIngestionService.Types';

export class SmsIngestionService {
    public readonly controller: SmsIngestionController;

    constructor() {
        this.controller = new SmsIngestionController();
    }
}

export const SmsIngestionServiceInstance = new SmsIngestionService();
