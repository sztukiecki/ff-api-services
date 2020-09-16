import { APIClient, APIMapping } from '../../http';

class BookingController extends APIClient {
    constructor() {
        super(APIMapping.documentGeneratorService);
    }

    async bookDocument(requestId: string, entities: { entityId: string; schema: string }[]) {
        return this.invokeApiWithErrorHandling<{ entityId: string }>('/booking', 'POST', {
            requestId,
            entities,
        });
    }
}

export default BookingController;
