import MatchController from './MatchController';
import { IS24LeadService } from '../IS24LeadService';

export class MatchmakingService {

    public readonly match: MatchController;

    public constructor() {
        this.match = new MatchController();
    }
}

export const MatchmakingServiceInstance  = new IS24LeadService();
