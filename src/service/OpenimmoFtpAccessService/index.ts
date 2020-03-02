import OpenimmoFtpAccountController from './OpenimmoFtpAccountController';

export * from './types';

export default class OpenimmoFtpAccessService {

    public static instance = new OpenimmoFtpAccessService();

    public readonly FtpAccount: OpenimmoFtpAccountController;

    constructor() {
        this.FtpAccount = new OpenimmoFtpAccountController();
    }
}
