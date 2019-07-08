import { AxiosResponse } from 'axios';
import { APIClient, APIMapping } from '../http';
import { Openimmo } from '@flowfact/types';

export class OpenimmoFtpAccessService extends APIClient {

    constructor() {
        super(APIMapping.openimmoFtpAccessService);
    }

    /**
     * TODO: Please comment this method
     * @param user
     */
    async fetchAllOpenimmos(): Promise<AxiosResponse> {
        return await this.invokeApi('/ftp', 'GET', undefined);
    }
    /**
     * TODO: Please comment this method
     * @param user
     */
    async fetchOpenimmo(user: string): Promise<AxiosResponse> {
        return await this.invokeApi(`/ftp/${user}`, 'GET');
    }

    /**
     * TODO: Please comment this method
     * @param user
     * @param openimmo
     */
    async updateOpenimmo(user: string, openimmo: Openimmo) {
        return await this.invokeApi(`/ftp/${user}`, 'PUT', openimmo);
    }

    /**
     * TODO: Please comment this method
     * @param openimmo
     */
    async createOpenimmo(openimmo: Openimmo) {
        return await this.invokeApi('/ftp', 'POST', openimmo);
    }

    /**
     * TODO: Please comment this method
     * @param user
     */
    async deleteOpenimmo(user: string) {
        return await this.invokeApi(`/ftp/${user}`, 'DELETE');
    }
}

export default new OpenimmoFtpAccessService();
