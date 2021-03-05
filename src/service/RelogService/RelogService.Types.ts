export interface MandatoryElkData {
    message: string;
    Severity: 'TRACE' | 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';
    SenderName: string;
    SenderVersion: string;
    product: string;
}

export interface FFAdditionalElkData {
    SenderFramework?: string;
    stage?: string;
    facility?: string;
    timestamp?: number;
    requestURI?: string;
    receivedStatusCode?: number;
    sentStatusCode?: number;
    location?: string;
    userId?: string;
    companyId?: string;
    requestId?: string;
    docker_host?: string;
    sourceName?: string;
    browserAgent?: string;
    referer?: string
}
