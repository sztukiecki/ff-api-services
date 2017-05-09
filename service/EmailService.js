import HttpClient, {APIMapping} from 'http';

export default class EmailService {

    constructor() {
        this.client = new HttpClient(APIMapping.emailService);
    }

    sendHtmlEmail(body) {
        return this.client.makeRequetSimple(body, '/mails/html', 'POST').then(s => s.data);
    }
}
