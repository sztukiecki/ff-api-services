export namespace SlackServiceTypes {

    export interface Credentials {
        token: string;
    }

    export interface Channel {
        id: string;
        name: string;
        member?: boolean;
    }

    export interface User {
        id: string;
        name: string;
    }
}
