export namespace SlackServiceTypes {

    export interface Credentials {
        token: string;
    }

    export interface Channel {
        id: string;
        name: string;
        member?: boolean;
    }

    export interface ChannelsResponse {
        channels: Channel[];
    }

    export interface SlackUser {
        id: string;
        name: string;
    }

    export interface SlackUsersResponse {
        users: SlackUser[];
    }
}
