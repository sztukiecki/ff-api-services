export namespace SlackServiceTypes {

    export interface Credentials {
        token: string;
    }

    export interface Channel {
        id: string;
        name: string;
        member?: boolean;
    }

    export interface SlackUser {
        id: string;
        name: string;
    }
}
