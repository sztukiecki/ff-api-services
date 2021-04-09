import { ActivityReportV2Controller } from './ActivityReportV2Controller';

export * from './ActivityReportV2.Types';

class ActivityReportService {
    public readonly activityReport: ActivityReportV2Controller;

    constructor() {
        this.activityReport = new ActivityReportV2Controller();
    }
}

export const ActivityReportServiceInstance = new ActivityReportService();
