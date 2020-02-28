import { APIClient, APIMapping } from './http';

export class OpenimmoImporterService extends APIClient {

    constructor() {
        super(APIMapping.openimmoImporterService);
    }

    async fetchLastUsedSenderSoftwareForCompanies(companyIds: string[]) {
        return this.invokeApi<Record<string, string>>('/internal/statistics/lastUsedSenderSoftwares', 'POST', companyIds);
    }
}

export default new OpenimmoImporterService();
