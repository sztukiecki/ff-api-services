import { APIClient, APIMapping } from '../../http';
import { UserAdditionalData } from './UserService.Types';

export class AdditionalDataController extends APIClient {
    constructor() {
        super(APIMapping.userService);
    }

    /**
     * Saves additional data record for given user.
     * @param additionalData
     * @param userId
     */
    async saveAdditionalData(additionalData: UserAdditionalData, userId: string) {
        return await this.invokeApiWithErrorHandling<UserAdditionalData>(`/additionalData/user/${userId}`, 'POST', additionalData);
    }

    /**
     * Gets all additional data records for given user.
     * @param userId
     */
    async fetchAllAdditionalData(userId: string) {
        return await this.invokeApiWithErrorHandling<UserAdditionalData[]>(`/additionalData/user/${userId}`, 'GET');
    }

    /**
     * Gets single additional data record for given user and key.
     * @param userId
     * @param key
     */
    async fetchSingleAdditionalData(userId: string, key: string) {
        return await this.invokeApiWithErrorHandling<UserAdditionalData>(`/additionalData/user/${userId}/${key}`, 'GET');
    }

    /**
     * Deletes single additional_data record for given user and key.
     * @param userId
     * @param key
     */
    async deleteAdditionalData(userId: string, key: string) {
        return await this.invokeApiWithErrorHandling(`/additionalData/user/${userId}/${key}`, 'DELETE');
    }
}
