import { APIClient, APIMapping, ApiResponse } from '../../http';
import { ActivityReportLinkType, ActivityReportRequestBody, ActivityReportRequestMethod, LambdaServiceResponse } from './ActivityReportV2.Types';
import { EnvironmentManagementInstance, StageTypes } from '../..';

export class ActivityReportV2Controller extends APIClient {
    constructor() {
        super(APIMapping.lambdaProxyService);
    }

    /**
     * generate activity report from estate
     * @param entityId entity id of the estate object
     */
    async generateActivityReportV2(entityId: string): Promise<ApiResponse<LambdaServiceResponse>> {
        const body = await this.prepareActivityReportV2Body('generate', entityId);
        return this.invokeActivityReportV2(body);
    }

    /**
     * publish activity report data as context file in the preconfigured AWS S3 bucket
     * @param entityId entity id of the activity report object
     */
    async publicActivityReportV2(entityId: string): Promise<ApiResponse<LambdaServiceResponse>> {
        const body = await this.prepareActivityReportV2Body('publish', entityId);
        return this.invokeActivityReportV2(body);
    }

    async prepareEmailBody(links: ActivityReportLinkType[], message: string): Promise<ApiResponse<LambdaServiceResponse>> {
        const authenticationToken = await this.getAuthenticationToken();
        const requestBody: ActivityReportRequestBody = {
            cognitoToken: authenticationToken,
            method: 'prepareEmailBody',
            links,
            message,
        };
        return await this.invokeApiWithErrorHandling<LambdaServiceResponse>('/activity-report2-lambda', 'POST', requestBody, {
            headers: { 'Content-Type': 'application/json' },
        });
    }

    /**
     * Generate a URL to get a preview of activity report, without creating a context file
     * @param activityReportId entity id of the activity report instance
     */
    async generateActivityReportPreviewUrl(activityReportId: string): Promise<string> {
        const baseUrl = this.getActivityReportUrl();
        const authenticationToken = await this.getAuthenticationToken();
        return `${baseUrl}/preview?hash=${authenticationToken}&id=${activityReportId}`;
    }

    /**
     * URL for activity report based on stage
     * We only have DEV and PROD environment for activity report.
     */
    getActivityReportUrl(): string {
        const stage = EnvironmentManagementInstance.getStage();
        if (stage === StageTypes.DEVELOPMENT) {
            return 'https://latest-development-activity-report-v2-cloud.fe.flowfact-dev.cloud';
        } else {
            return 'https://activityreport.flowfact.com';
        }
    }

    private async prepareActivityReportV2Body(
        method: ActivityReportRequestMethod,
        entityId?: string,
        links?: ActivityReportLinkType[],
        message?: string
    ): Promise<ActivityReportRequestBody> {
        const authenticationToken = await this.getAuthenticationToken();
        if (method === 'prepareEmailBody') {
            return {
                cognitoToken: authenticationToken,
                method: 'prepareEmailBody',
                links: links || [],
                message: message || '',
            };
        }
        const requestBody: ActivityReportRequestBody = {
            cognitoToken: authenticationToken,
            method: method,
        };
        if (entityId) {
            requestBody.entityId = entityId;
        }
        return requestBody;
    }

    private async invokeActivityReportV2(body: ActivityReportRequestBody): Promise<ApiResponse<LambdaServiceResponse>> {
        return await this.invokeApiWithErrorHandling<LambdaServiceResponse>('/activity-report2-lambda', 'POST', body, {
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
