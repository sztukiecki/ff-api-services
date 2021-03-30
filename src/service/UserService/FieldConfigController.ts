import { APIClient, APIMapping } from '../../http';
import { AdditionalField } from './UserService.Types';

export class FieldConfigController extends APIClient {
    constructor() {
        super(APIMapping.userService);
    }

    /**
     * Saves new additional field configuration for currently logged in user.
     * @param field
     */
    async saveField(field: AdditionalField) {
        return await this.invokeApiWithErrorHandling<AdditionalField>(`/fieldConfig`, 'POST', field);
    }

    /**
     * Gets all additional field configurations available in company scope for currently logged in user.
     */
    async fetchFields() {
        return await this.invokeApiWithErrorHandling<AdditionalField[]>(`/fieldConfig`, 'GET');
    }

    /**
     * Deletes single field configuration by given ID.
     * @param fieldId
     */
    async deleteField(fieldId: string) {
        return await this.invokeApiWithErrorHandling(`/fieldConfig/${fieldId}`, 'DELETE');
    }
}
