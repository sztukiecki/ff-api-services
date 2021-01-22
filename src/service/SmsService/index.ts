import {SmsController} from "./SmsController";


export * from './SmsService.Types';

export class SmsService {
    public readonly controller: SmsController;

    constructor() {
        this.controller = new SmsController();
    }
}

export const SmsServiceInstance = new SmsService();
