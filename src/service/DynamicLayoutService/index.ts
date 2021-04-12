import OverviewController from './OverviewController';
import NavigationController from './NavigationController';
import WidgetLayoutsController from './WidgetLayoutsController';
import WidgetStoreController from './WidgetStoreController';
import StartPageController from "./StartPageController";

export * from './StartPageTypes';
export * from './NavigationTypes';
export * from './WidgetTypes';
export * from './WidgetLayoutTypes';

export class DynamicLayoutService {
    public readonly overview: OverviewController;
    public readonly startPage: StartPageController;
    public readonly navigation: NavigationController;
    public readonly layouts: WidgetLayoutsController;
    public readonly widgetStore: WidgetStoreController;

    constructor() {
        this.overview = new OverviewController();
        this.startPage = new StartPageController();
        this.navigation = new NavigationController();
        this.layouts = new WidgetLayoutsController();
        this.widgetStore = new WidgetStoreController();
    }
}

export const DynamicLayoutServiceInstance = new DynamicLayoutService();
