export namespace PreconditionServiceTypes {
    export interface Preconditions {
        preconditions: Precondition[];
    }

    export interface Precondition {
        satisfied: boolean;
    }
}
