import {ActivityReportV2Controller} from './ActivityReportV2Controller';
import {LogDirectoryController} from './LogDirectoryController';


class LambdaProxyService {
    public readonly activityReportController: ActivityReportV2Controller;
    public readonly logDirectoryController: LogDirectoryController;

    constructor() {
        this.activityReportController = new ActivityReportV2Controller();
        this.logDirectoryController = new LogDirectoryController();
    }

}

export const LambdaProxyServiceInstance = new LambdaProxyService();
