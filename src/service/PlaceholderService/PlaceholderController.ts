import { APIClient, APIMapping } from '../../http';
import { PlaceholderServiceTypes } from './PlaceholderService.Types';
import PlaceholderRequest = PlaceholderServiceTypes.PlaceholderRequest;

export default class PlaceholderController extends APIClient {
    constructor() {
        super(APIMapping.placeholderService);
    }

    /**
     * Resolve placeholders of a specific request.
     * @param placeholderRequest
     */
    async fetchPlaceholders(placeholderRequest: PlaceholderRequest) {
        return this.invokeApiWithErrorHandling('/placeholders', 'POST', placeholderRequest);
    }
}
