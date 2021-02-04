export namespace UserServiceTypes {
    export interface IdentifiedUserResponse {
        identifier: string;
        identifiersOfMatchingAliases: string[];
    }
}
