import { APIClient, APIMapping } from '../../http';
import {StartPageTypes} from "./StartPageTypes";
import StartPage = StartPageTypes.StartPage;

export default class StartPageController extends APIClient {
    constructor() {
        super(APIMapping.dynamicLayoutService);
    }

    /**
     * Fetches the start page configuration.
     */
    async fetchStartPage() {
        return this.invokeApiWithErrorHandling<StartPage>('/start-pages', 'GET');
    }

    /**
     * Update the start page configuration for the current company.
     * This resource can just be called as a ADMIN user.
     */
    async updateStartPage(startPage: StartPage) {
        return this.invokeApiWithErrorHandling<StartPage>('/start-pages', 'PUT', startPage);
    }
}
