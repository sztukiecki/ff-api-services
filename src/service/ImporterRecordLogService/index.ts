import { ImporterRecordLogController } from './ImporterRecordLogController';

class ImporterRecordLogService {
    public readonly importerRecordLog: ImporterRecordLogController;

    constructor() {
        this.importerRecordLog = new ImporterRecordLogController();
    }
}

export const ImporterRecordLogServiceInstance = new ImporterRecordLogService();
