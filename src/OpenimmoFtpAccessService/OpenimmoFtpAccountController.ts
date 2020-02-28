import { AxiosResponse } from 'axios';
import { APIClient, APIMapping } from '../http';
import {OpenimmoFtpAccount} from './types';

export default class OpenimmoFtpAccountController extends APIClient {

    constructor() {
        super(APIMapping.openimmoFtpAccessService);
    }

    /**
     * get all openimmmos
     */
    async fetchAll(): Promise<AxiosResponse<OpenimmoFtpAccount[]>> {
        return await this.invokeApi('/ftp', 'GET', undefined);
    }

    /**
     * get one openimmo by using user
     * @param user
     */
    async fetch(user: string): Promise<AxiosResponse<OpenimmoFtpAccount>> {
        return await this.invokeApi(`/ftp/${user}`, 'GET');
    }

    /**
     * update an openimmo
     * @param user
     * @param openimmo
     */
    async update(user: string, openimmo: OpenimmoFtpAccount): Promise<AxiosResponse<OpenimmoFtpAccount>> {
        return await this.invokeApi(`/ftp/${user}`, 'PUT', openimmo);
    }

    /**
     * create an openimmo
     * @param openimmo
     */
    async create(openimmo: OpenimmoFtpAccount): Promise<AxiosResponse<OpenimmoFtpAccount>> {
        return await this.invokeApi('/ftp', 'POST', openimmo);
    }

    /**
     * delete an openimmo
     * @param user
     */
    async delete(user: string) {
        return await this.invokeApi(`/ftp/${user}`, 'DELETE');
    }
}