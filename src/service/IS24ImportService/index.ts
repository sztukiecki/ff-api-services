import IS24ImportController from './IS24ImportController';

export * from './IS24ImportService.Types';

export class IS24ImportService {

    public readonly import: IS24ImportController;

    constructor() {
        this.import = new IS24ImportController();
    }
}

export const IS24ImportServiceInstance = new IS24ImportService();