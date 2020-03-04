import OverviewController from './OverviewController';
import NavigationController from './NavigationController';

export * from './DynamicLayoutService.Types';

export class DynamicLayoutService {

    public readonly overview: OverviewController;
    public readonly navigation: NavigationController;

    constructor() {
        this.overview = new OverviewController();
        this.navigation = new NavigationController();
    }
}

export const DynamicLayoutServiceInstance = new DynamicLayoutService();
