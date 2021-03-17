export type ActivityReportRequestMethod = 'generate' | 'publish' | 'prepareEmailBody';

export interface ActivityReportRequestBody {
    cognitoToken: string;
    method: string;
    entityId?: string;
    links?: ActivityReportLinkType[];
    message?: string;
}

export interface LambdaServiceResponse {
    response: { statusCode: number; body: string };
    statusCode: number;
    functionName: string;
    invocationType?: string;
}

export interface ActivityReportLinkType {
    label: string;
    href: string;
}
