export namespace SlackIntegrationServiceTypes {

    export interface Credentials {
        token: string;
    }

    export interface CompanyIntegrationSetting {
        id: number;
        companyId: string;
        slackConfiguration: SlackConfiguration;
    }

    export interface CreateChannelRequest {
        name: string;
        purpose?: string;
        topic?: string;
    }

    export interface DeleteChannelRequest {
        name: string;
        soft?: boolean;
    }

    export interface PostMessageRequest {
        channel: string;
        message: string;
        senderName: string;
        senderImageUrl?: string;
        threadId?: string;
    }

    export interface SlackConfiguration {
        oauthToken: string;
        teamId: string;
        relatedChannels: Array<string>;
    }

    export interface OAuthAccessRequest {
        companyId: string;
        code: string;
    }
}
