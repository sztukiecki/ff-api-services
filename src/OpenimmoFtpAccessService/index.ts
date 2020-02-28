import OpenimmoFtpAccountController from './OpenimmoFtpAccountController';

export * from './types';

export class OpenimmoFtpAccessService {

    public readonly FtpAccount: OpenimmoFtpAccountController;

    constructor() {
        this.FtpAccount = new OpenimmoFtpAccountController();
    }
}

export default new OpenimmoFtpAccessService();