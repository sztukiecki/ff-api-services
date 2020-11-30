import { StatisticsController } from './StatisticsController';

export * from './InteractiveExposeStatisticsService.Types';

export class InteractiveExposeStatisticsService {

    public readonly statistics: StatisticsController;

    constructor() {
        this.statistics = new StatisticsController();
    }

}

export const InteractiveExposeStatisticsServiceInstance = new InteractiveExposeStatisticsService();
