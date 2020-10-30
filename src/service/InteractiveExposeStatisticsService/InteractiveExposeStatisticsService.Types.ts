export namespace InteractiveExposeStatisticsServiceTypes {

    export interface DwellTimeStatistic {
        type: 'IEX_DWELL_TIME';
        min: number;
        max: number;
        average: number;
    }

    export interface OpenCountStatistic {
        type: 'IEX_OPEN_COUNT';
        ieCreated: 4,
        iePageVisited: 0
    }

}
