import APIClient from "../http/APIClient";
import APIMapping from "../http/APIMapping";

export class GDPRService extends APIClient {

    constructor() {
        super(APIMapping.gdprService);
    }

    async fetchContact(contactId: string, userId: string, companyId: string) {
        return await this.invokeApi('/public/contact', 'GET', undefined, {
            queryParams: {
                contactId: contactId,
                userId: userId,
                companyId: companyId
            }
        });
    }
}

export default new GDPRService();