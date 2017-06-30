import HttpClient, {APIMapping} from '../http';

export default class EmailService {
    static client = new HttpClient(APIMapping.emailService);

    static createDomain(domain) {
        return this.client.makeRequestSimple({domain}, '/configuration/whitelabel', 'POST').then(({data}) => data);
    }

    static verifyDomain(domain) {
        return this.client.makeRequestSimple({domain}, '/configuration/whitelabel/verify', 'POST').then(({data}) => data);
    }
}
