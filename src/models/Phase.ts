export default interface Phase {
    name: string;
    isGlobal: boolean;
    captions: Record<string, string>;
    entityAmount: number;
    children: Phase[];
    transactions: any[];
}
