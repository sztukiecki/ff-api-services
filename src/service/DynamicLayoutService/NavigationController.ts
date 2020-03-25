import { APIClient, APIMapping } from '../../http';
import { DynamicLayoutServiceTypes } from './DynamicLayoutService.Types';
import Navigation = DynamicLayoutServiceTypes.Navigation;

export default class NavigationController extends APIClient {

    constructor() {
        super(APIMapping.dynamicLayoutService);
    }

    /**
     * Fetches the navigation configurations.
     * All items for which the current user hasn't enough permissions, will be removed automatically from the backend.
     */
    async fetchNavigation() {
        return this.invokeApiWithErrorHandling<Navigation>('/navigations', 'GET');
    }

    /**
     * Fetches the navigation configurations as admin.
     * The admin resource will not remove any items if the current user hasn't enough permissions.
     * This resource is only for users with the role ADMIN!
     */
    async fetchAdminNavigation() {
        return this.invokeApiWithErrorHandling<Navigation>('/navigations/admin', 'GET');
    }

    /**
     * Update the navigation configurations for the current company.
     * This resource can just be called as a ADMIN user.
     */
    async updateNavigation(navigation: Navigation) {
        return this.invokeApiWithErrorHandling<Navigation>('/navigations/admin', 'PUT', navigation);
    }
}
