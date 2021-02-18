import {ItemsController} from './ItemsController';

export * from './SupportService.Types';

export class SupportService {

    public readonly items: ItemsController;

    constructor() {
        this.items = new ItemsController();
    }

}

export const SupportServiceInstance = new SupportService();