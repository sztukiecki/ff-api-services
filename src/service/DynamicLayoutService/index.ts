import OverviewController from './OverviewController';
import NavigationController from './NavigationController';
import WidgetLayoutsController from './WidgetLayoutsController';

export * from './NavigationTypes';

export class DynamicLayoutService {

    public readonly overview: OverviewController;
    public readonly navigation: NavigationController;
    public readonly layouts: WidgetLayoutsController;

    constructor() {
        this.overview = new OverviewController();
        this.navigation = new NavigationController();
        this.layouts = new WidgetLayoutsController();
    }
}

export const DynamicLayoutServiceInstance = new DynamicLayoutService();
