import { APIClient, APIMapping } from '../../http';
import { ProofOfActivityServiceTypes } from './ProofOfActivityService.Types';

import EmailData = ProofOfActivityServiceTypes.EmailData;
import DateRange = ProofOfActivityServiceTypes.DateRange;
import EntityIdData = ProofOfActivityServiceTypes.EntityIdData;
import ExcludedItem = ProofOfActivityServiceTypes.ExcludedItem;

export class EmailController extends APIClient {
    constructor() {
        super(APIMapping.proofOfActivityService);
    }

    /**
     * Sends an activity proof email with the given template
     * @param email
     * @param dateRange
     * @param activityId
     * @param templateId
     * @param entity
     * @param excludedItems
     */
    async sendEmail(
        email: Omit<EmailData, 'from'>,
        dateRange: DateRange,
        activityId: string,
        templateId: string,
        entity: EntityIdData,
        excludedItems: ExcludedItem[]
    ) {
        return this.invokeApiWithErrorHandling('/email/send', 'POST', {
            email,
            dateRange,
            activityId,
            templateId,
            entity,
            excludedItems,
        });
    }

    async generatePreview(
        email: Omit<EmailData, 'from'>,
        dateRange: DateRange,
        activityId: string,
        templateId: string,
        entity: EntityIdData,
        excludedItems: ExcludedItem[]
    ) {
        const body = {
            email,
            dateRange,
            activityId,
            templateId,
            entity,
            excludedItems,
        };

        return this.invokeApiWithErrorHandling<string>('/email/preview', 'POST', body, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'text/html',
            },
        });
    }
}
