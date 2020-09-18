import { APIClient, APIMapping } from '../../http';
import { OpenImmoFtpAccountTypes } from './OpenimmoFtpAccessService.Types';
import OpenimmoFtpAccount = OpenImmoFtpAccountTypes.OpenimmoFtpAccount;

export default class OpenimmoFtpAccountController extends APIClient {
    constructor() {
        super(APIMapping.openimmoFtpAccessService);
    }

    /**
     * get all openimmmos
     */
    async fetchAll() {
        return await this.invokeApiWithErrorHandling<OpenimmoFtpAccount[]>('/ftp', 'GET', undefined);
    }

    /**
     * get one openimmo by using user
     * @param user
     */
    async fetch(user: string) {
        return await this.invokeApiWithErrorHandling<OpenimmoFtpAccount>(`/ftp/${user}`, 'GET');
    }

    /**
     * update an openimmo
     * @param user
     * @param openimmo
     */
    async update(user: string, openimmo: OpenimmoFtpAccount) {
        return await this.invokeApiWithErrorHandling<OpenimmoFtpAccount>(`/ftp/${user}`, 'PUT', openimmo);
    }

    /**
     * create an openimmo
     * @param openimmo
     */
    async create(openimmo: OpenimmoFtpAccount) {
        return await this.invokeApiWithErrorHandling<OpenimmoFtpAccount>('/ftp', 'POST', openimmo);
    }

    /**
     * delete an openimmo
     * @param user
     */
    async delete(user: string) {
        return await this.invokeApiWithErrorHandling<OpenimmoFtpAccount>(`/ftp/${user}`, 'DELETE');
    }
}
