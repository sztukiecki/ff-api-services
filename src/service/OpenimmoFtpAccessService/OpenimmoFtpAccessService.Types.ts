export namespace OpenImmoFtpAccountTypes {
    export interface OpenimmoFtpAccount {
        user: string;
        password: string;
        status: '0' | '1';
        protocol: string;
        uniqueKey?: string;
    }
}
