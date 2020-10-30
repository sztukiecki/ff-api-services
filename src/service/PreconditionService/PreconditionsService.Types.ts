export namespace PreconditionServiceTypes {
    export interface Preconditions {
        preconditions: Array<Precondition & { id: string }>;
    }

    export interface Precondition {
        satisfied: boolean;
    }
}
