export namespace SearchServiceTypes {
    export interface GroupingResult {
        totalCount: number;
        countPerGroup: GroupingItem[];
    }

    export interface GroupingItem {
        count: number;
        values: { [key: string]: GroupingPropertyValue };
    }

    export type GroupingPropertyValue = string | number | boolean;
}
