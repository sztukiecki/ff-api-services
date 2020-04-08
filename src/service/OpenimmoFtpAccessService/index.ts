import OpenimmoFtpAccountController from './OpenimmoFtpAccountController';
import OpenimmoAlertRecipientController from './OpenimmoAlertRecipientController';

export * from './OpenimmoFtpAccessService.Types';

export class OpenimmoFtpAccessService {

    public static instance = new OpenimmoFtpAccessService();

    public readonly ftpAccount: OpenimmoFtpAccountController;
    public readonly alertRecipient: OpenimmoAlertRecipientController;

    constructor() {
        this.ftpAccount = new OpenimmoFtpAccountController();
    }
}
