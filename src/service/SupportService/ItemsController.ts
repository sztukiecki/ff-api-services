import { APIClient, APIMapping } from '../../http';
import { SupportServiceTypes } from './SupportService.Types';

export class ItemsController extends APIClient {
    constructor() {
        super(APIMapping.supportService);
    }

    async fetchItems(url: string) {
        return this.invokeApiWithErrorHandling<SupportServiceTypes.SupportItem[]>('/supportItems', 'POST', {
            url: url,
        });
    }
}
