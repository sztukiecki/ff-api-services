import OpenimmoFtpAccountController from './OpenimmoFtpAccountController';

export * from './OpenimmoFtpAccessService.Types';

export class OpenimmoFtpAccessService {

    public static instance = new OpenimmoFtpAccessService();

    public readonly ftpAccount: OpenimmoFtpAccountController;

    constructor() {
        this.ftpAccount = new OpenimmoFtpAccountController();
    }
}
