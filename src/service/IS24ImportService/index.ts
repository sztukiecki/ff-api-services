import IS24ImportController from './IS24ImportController';
import IS24ProjectController from './IS24ProjectController';

export * from './IS24ImportService.Types';

export class IS24ImportService {

    public readonly import: IS24ImportController;
    public readonly project: IS24ProjectController;

    constructor() {
        this.import = new IS24ImportController();
        this.project = new IS24ProjectController();
    }
}

export const IS24ImportServiceInstance = new IS24ImportService();