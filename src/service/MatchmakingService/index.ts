import MatchController from './MatchController';
import { IS24LeadService } from '../IS24LeadService';

export class MatchmakingService {

    public readonly matchController: MatchController;

    public constructor() {
        this.matchController = new MatchController();
    }
}

export const MatchmakingServiceInstance  = new IS24LeadService();
