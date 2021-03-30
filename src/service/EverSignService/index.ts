import { SignController } from './SignController';

export * from './EverSignService.Types';

export class EverSignService {
    public readonly sign: SignController;

    constructor() {
        this.sign = new SignController();
    }
}

export const EverSignServiceInstance = new EverSignService();
