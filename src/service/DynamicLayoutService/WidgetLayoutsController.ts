import { APIClient, APIMapping } from '../../http';
import { WidgetLayoutTypes } from './NavigationTypes';

import PagedWidgetLayouts = WidgetLayoutTypes.PagedWidgetLayouts;
import WidgetLayout = WidgetLayoutTypes.WidgetLayout;

class WidgetLayoutsController extends APIClient {

    constructor() {
        super(APIMapping.dynamicLayoutService);
    }

    /**
     * If schemas are specified, only layouts of those schemas are returned.
     * @param schemaNames
     */
    async fetchLayouts(schemaNames: string[] = []) {
        return this.invokeApiWithErrorHandling<PagedWidgetLayouts>('/widget-layouts', 'GET', undefined, {
            queryParams: {
                schema: schemaNames.join(','),
            },
            headers: {
                'x-ff-version': 2
            }
        });
    }

    /**
     * Creates a new layout for a specific schema
     * @param layout
     */
    async createLayout(layout: WidgetLayout) {
        return this.invokeApiWithErrorHandling<WidgetLayout>('/widget-layouts', 'POST', layout, {
            headers: {
                'x-ff-version': 2
            }
        });
    }

    /**
     * Fetches a layout by the id
     * @param layoutId
     */
    async fetchLayout(layoutId: string) {
        return this.invokeApiWithErrorHandling<WidgetLayout>(`/widget-layouts/${layoutId}`, 'GET', {
            headers: {
                'x-ff-version': 2
            }
        });
    }

    /**
     * Updates a layout by the id
     * @param layout
     */
    async updateLayout(layout: WidgetLayout) {
        return this.invokeApiWithErrorHandling<WidgetLayout>(`/widget-layouts/${layout.id}`, 'PUT', layout, {
            headers: {
                'x-ff-version': 2
            }
        });
    }

    /**
     * Checks if a custom layout has a global layout or not
     * 204 = yes there is a global layout
     * 404 = There is no global layout
     * @param layoutId
     */
    async checkHasGlobalLayout(layoutId: string) {
        return this.invokeApiWithErrorHandling(`/widget-layouts/assignments/${layoutId}`, 'GET');
    }

    /**
     * Deletes a custom layout
     * @param layoutId
     */
    async deleteCustomLayout(layoutId: string) {
        return this.invokeApiWithErrorHandling(`/widget-layouts/${layoutId}`, 'DELETE');
    }
}

export default WidgetLayoutsController;
