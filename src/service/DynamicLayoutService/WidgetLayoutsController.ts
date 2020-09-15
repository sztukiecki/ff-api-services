import { APIClient, APIMapping } from '../../http';
import { WidgetLayoutTypes } from './WidgetLayoutTypes';

import PagedWidgetLayouts = WidgetLayoutTypes.PagedWidgetLayouts;
import SchemaBoundWidgetLayout = WidgetLayoutTypes.SchemaBoundWidgetLayout;
import LayoutDomainType = WidgetLayoutTypes.LayoutDomainType;
import BaseWidgetLayout = WidgetLayoutTypes.BaseWidgetLayout;

class WidgetLayoutsController extends APIClient {

    constructor() {
        super(APIMapping.dynamicLayoutService);
    }

    /**
     * If schemas are specified, only layouts of those schemas are returned.
     * @param schemaNames
     * @param short
     *  Return short variants or not
     * @param layoutDomainType
     *  With LayoutDomainType.GENERAL returns layouts for General Widgets, LayoutDomainType.SCHEMA_BOUND returns layouts for Entity Widgets.
     */
    async fetchLayouts(schemaNames: string[] = [], short: boolean = false, layoutDomainType: LayoutDomainType = LayoutDomainType.SCHEMA_BOUND) {
        return this.invokeApiWithErrorHandling<PagedWidgetLayouts>('/widget-layouts', 'GET', undefined, {
            queryParams: {
                schema: schemaNames.join(','),
                short: short,
                domainType: layoutDomainType
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
    async createLayout<T extends BaseWidgetLayout = SchemaBoundWidgetLayout>(layout: T) {
        return this.invokeApiWithErrorHandling<T>('/widget-layouts', 'POST', layout, {
            headers: {
                'x-ff-version': 2
            }
        });
    }

    /**
     * Fetches a layout by the id
     * @param layoutId
     */
    async fetchLayout<T extends BaseWidgetLayout = SchemaBoundWidgetLayout>(layoutId: string) {
        return this.invokeApiWithErrorHandling<T>(`/widget-layouts/${layoutId}`, 'GET', undefined,{
            headers: {
                'x-ff-version': 2
            }
        });
    }

    /**
     * Updates a layout by the id
     * @param layout
     */
    async updateLayout<T extends BaseWidgetLayout = SchemaBoundWidgetLayout>(layout: T) {
        return this.invokeApiWithErrorHandling<T>(`/widget-layouts/${layout.id}`, 'PUT', layout, {
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
