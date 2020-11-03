export namespace PreconditionServiceTypes {
    export interface Preconditions {
        preconditions: (Precondition & { id: string })[];
    }

    export interface Precondition {
        satisfied: boolean;
    }
}
