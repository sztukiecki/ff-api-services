import { APIClient, APIMapping } from '../../http';
import { WidgetTypes } from './WidgetTypes';
import PagedWidgets = WidgetTypes.PagedWidgets;
import {WidgetLayoutTypes} from "./WidgetLayoutTypes";
import LayoutDomainType = WidgetLayoutTypes.LayoutDomainType;

class WidgetStoreController extends APIClient {

    constructor() {
        super(APIMapping.dynamicLayoutService);
    }

    async fetchAssignments(layoutDomainType?: LayoutDomainType, schemaName?: string) {
        return this.invokeApiWithErrorHandling<PagedWidgets>('/widget-store/widget-assignments', 'GET', undefined, {
            queryParams: {
                domainType: layoutDomainType,
                schema: schemaName
            }
        });
    }
}

export default WidgetStoreController;
