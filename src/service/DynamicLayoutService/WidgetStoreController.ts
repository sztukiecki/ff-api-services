import { APIClient, APIMapping } from '../../http';
import { WidgetTypes } from './WidgetTypes';
import PagedWidgets = WidgetTypes.PagedWidgets;

class WidgetStoreController extends APIClient {

    constructor() {
        super(APIMapping.dynamicLayoutService);
    }

    async fetchAssignments(schemaName?: string) {
        return this.invokeApiWithErrorHandling<PagedWidgets>('/widget-store/widget-assignments', 'GET', undefined, {
            queryParams: {
                schema: schemaName
            }
        });
    }
}

export default WidgetStoreController;
