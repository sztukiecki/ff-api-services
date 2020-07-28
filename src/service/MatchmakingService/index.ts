import MatchController from './MatchController';

export class MatchmakingService {

    public readonly match: MatchController;

    public constructor() {
        this.match = new MatchController();
    }
}

export const MatchmakingServiceInstance  = new MatchmakingService();
