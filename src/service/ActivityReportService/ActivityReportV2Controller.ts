import { APIClient, APIMapping, ApiResponse } from '../../http';
import { ActivityReportRequestBody, ActivityReportRequestMethod, LambdaServiceResponse } from './ActivityReportV2.Types';
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
        return this.invokeActivityReportV2('generate', entityId);
    }

    /**
     * publish activity report data as context file in the preconfigured AWS S3 bucket
     * @param entityId entity id of the activity report object
     */
    async publicActivityReportV2(entityId: string): Promise<ApiResponse<LambdaServiceResponse>> {
        return this.invokeActivityReportV2('publish', entityId);
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
            // TODO change it after the URL for PROD environment is configured
            return 'https://latest-development-activity-report-v2-cloud.fe.flowfact-dev.cloud';
        }
    }

    private async prepareActivityReportV2Body(method: ActivityReportRequestMethod, entityId: string): Promise<ActivityReportRequestBody> {
        const authenticationToken = await this.getAuthenticationToken();
        return {
            cognitoToken: authenticationToken,
            entityId: entityId,
            method: method,
        };
    }

    private async invokeActivityReportV2(method: ActivityReportRequestMethod, entityId: string): Promise<ApiResponse<LambdaServiceResponse>> {
        const body = await this.prepareActivityReportV2Body(method, entityId);
        return await this.invokeApiWithErrorHandling<LambdaServiceResponse>('/activity-report2-lambda', 'POST', body, {
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
