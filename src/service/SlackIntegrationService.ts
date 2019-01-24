import { APIClient, APIMapping } from '../http';
import { AxiosResponse } from 'axios';

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

export type TypedAxiosResponse<T> = AxiosResponse & {data: T};

export interface SlackApi {

    postMessage(postMessageRequest: PostMessageRequest): Promise<AxiosResponse>;
    createChannel(createChannelRequest: CreateChannelRequest): Promise<AxiosResponse>;
    deleteChannel(deleteChannelRequest: DeleteChannelRequest): Promise<AxiosResponse>;
    oAuthAccess(oAuthAccessRequest: OAuthAccessRequest): Promise<AxiosResponse>;

}

export interface SettingsApi {

    getSettings(): Promise<TypedAxiosResponse<CompanyIntegrationSetting>>;
    postSettings(slackConfiguration: SlackConfiguration): Promise<AxiosResponse>;
    deleteSettings(): Promise<AxiosResponse>;

}

export class SlackIntegrationService extends APIClient {

    private readonly _slackApi: SlackApi;
    private readonly _settingsApi: SettingsApi;

    constructor() {
        super(APIMapping.slackIntegrationService);
        this._slackApi = {
            postMessage: postMessageRequest => this.invokeApi('/slack/postMessage', 'post', postMessageRequest),
            createChannel: createChannelRequest => this.invokeApi('/slack/createChannel', 'post', createChannelRequest),
            deleteChannel: deleteChannelRequest => this.invokeApi('/slack/deleteChannel', 'post', deleteChannelRequest),
            oAuthAccess: oAuthAccessRequest => this.invokeApi('/slack/oauthAccess', 'post', oAuthAccessRequest)
        };
        this._settingsApi = {
            getSettings: () => this.invokeApi('/companyIntegrationSettings', 'get'),
            postSettings: slackConfiguration => this.invokeApi('/companyIntegrationSettings', 'post', slackConfiguration),
            deleteSettings: () => this.invokeApi('/companyIntegrationSettings', 'delete')
        };
    }

    public get slack(): SlackApi {
        return this._slackApi;
    }

    public get settings(): SettingsApi {
        return this._settingsApi;
    }

}

export default new SlackIntegrationService();
