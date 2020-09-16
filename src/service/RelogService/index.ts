import { ElkController } from './ElkController';

export * from './RelogService.Types';

export class RelogService {
    public static instance = new RelogService();

    public readonly elk: ElkController;

    constructor() {
        this.elk = new ElkController();
    }
}

export const RelogServiceInstance = new RelogService();
