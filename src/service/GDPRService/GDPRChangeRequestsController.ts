import { APIClient, APIMapping } from '../../http';
import { GDPRServiceTypes } from './GDPRService.Types';

export class GDPRChangeRequestsController extends APIClient {
    constructor() {
        super(APIMapping.gdprService);
    }

    /**
     * TODO: Please comment this method
     * @param changeRequestId
     * @param status
     * @param reason
     */
    async updateChangeRequestStatus(changeRequestId: string, status: GDPRServiceTypes.DataChangeRequestApprovalStatus, reason: string) {
        const formData = new FormData();
        formData.append('reason', reason);

        return await this.invokeApiWithErrorHandling(`/changeRequests/${changeRequestId}/status/${status}`, 'POST', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    /**
     * TODO: Please comment this method
     */
    async fetchAllChangeRequests() {
        return await this.invokeApiWithErrorHandling<GDPRServiceTypes.DataChangeRequest[]>('/changeRequests/all', 'GET');
    }
}
