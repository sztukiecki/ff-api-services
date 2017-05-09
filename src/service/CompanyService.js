import HttpClient, {APIMapping} from 'http';

export default class CompanyService {

    constructor() {
        this.client = new HttpClient(APIMapping.companyService);
    }

    //domain -> can also be an email
    createCompany(companyName, companyUrl, domain) {
        return this.client.makeRequetSimple({
            companyName,
            companyUrl,
            domain
        }, '/company', 'POST');
    }

    usePreset(presets) {
        return this.client.makeRequetSimple({
            presets
        }, '/company/usepreset', 'PUT');
    }

    updateCompany(body) {
        return this.client.makeRequetSimple(body, '/company', 'PUT');
    }

    findCompany(companyId) {
        return this.client.makeRequetSimple({}, `/company/${encodeURIComponent(companyId)}`, 'GET');
    }

    memberCountByEMailAddress(mailaddress) {
        return this.client.makeRequetSimple({
            mailaddress: mailaddress
        }, '/company/numberOfUsers', 'PUT');
    }

    test() {
        return this.client.makeRequetSimple({}, '/company', 'GET');
    }
}


const StatusMapping = {
    create: {
        ALREADY_EXIST: 400,
        MANDANTORY_FIELD_NOT_FILLED: 422,
        INTERNAL_SERVER_ERROR: 500
    },
    findByEmail: {
        NO_COMPANY_FOUND: 204,
        INTERNAL_SERVER_ERROR: 500
    },
    findById: {
        ID_NOT_FOUND: 204,
        INTERNAL_SERVER_ERROR: 500
    }
};

export {
    StatusMapping
};