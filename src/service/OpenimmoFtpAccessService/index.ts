import OpenimmoFtpAccountController from './OpenimmoFtpAccountController';
import OpenimmoReportRecipientController from './OpenimmoReportRecipientController';

export * from './OpenimmoFtpAccessService.Types';

export class OpenimmoFtpAccessService {

    public static instance = new OpenimmoFtpAccessService();

    public readonly ftpAccount: OpenimmoFtpAccountController;
    public readonly alertRecipient: OpenimmoReportRecipientController;

    constructor() {
        this.ftpAccount = new OpenimmoFtpAccountController();
        this.alertRecipient = new OpenimmoReportRecipientController();
    }
}
