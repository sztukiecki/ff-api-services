import { APIClient, APIMapping } from '../http';
import { AxiosResponse } from 'axios';

type ActivityReportRequestMethod = 'generate' | 'publish';

interface ActivityReportRequestBody {
    cognitoToken: string,
    entityId: string,
    method: string
}

export class LambdaProxyService extends APIClient {
    constructor() {
        super(APIMapping.lambdaProxyService);
    }

    private async prepareActivityReportV2Body(method: ActivityReportRequestMethod, entityId: string): Promise<ActivityReportRequestBody> {
        const authenticationToken =  await this.getAuthenticationToken();
        return {
            cognitoToken: authenticationToken,
            entityId: entityId,
            method: method,
        };
    }

    async fetchLogDirectories() {
        return this.invokeApiWithErrorHandling('/ff-importer-v2-record-log-s3-directory-entries', 'GET');
    }

    async fetchDirectoryContents(table: string) {
        return this.invokeApiWithErrorHandling('/ff-importer-v2-record-log-s3-directory-content', 'POST', { table });
    }

    public async invokeActivityReportV2<T = any>(method:ActivityReportRequestMethod, entityId: string) :Promise<AxiosResponse<T>>{
        const body = await this.prepareActivityReportV2Body(method, entityId);
        return this.invokeApi<T>(`/activity-report2-lambda`, 'POST', body, {headers: { 'Content-Type': 'application/json' }});
    }

    public async generateActivityReportV2(entityId: string){
        return this.invokeActivityReportV2('generate', entityId);
    }

    public async publicActivityReportV2(entityId: string) {
        return this.invokeActivityReportV2('publish', entityId);
    }
}

export default new LambdaProxyService();
