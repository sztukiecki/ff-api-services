import { ActivityReportV2Controller } from './ActivityReportV2Controller';

class ActivityReportService {
    public readonly activityReport: ActivityReportV2Controller;

    constructor() {
        this.activityReport = new ActivityReportV2Controller();
    }
}

export const ActivityReportServiceInstance = new ActivityReportService();
