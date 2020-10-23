export interface Precondition {
    id: string;
    satisfied: boolean;
}

export interface Preconditions {
    preconditions: Precondition[]
}
