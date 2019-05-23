import { NylasContactSyncEntry, NylasContactSyncEntryPostModel } from '@flowfact/types';
import { AxiosResponse } from 'axios';
import APIClient from '../http/APIClient';
import APIMapping from '../http/APIMapping';

export class NylasContactSyncService extends APIClient {

    constructor() {
        super(APIMapping.nylasContactSyncService);
    }

    /**
     * Retrieves all syncEntries for the given contactId
     * @param {string} contactId - The id of the contact you want to retrieve the syncEntries for
     * @return {NylasContactSyncEntry[]}
     */
    fetchByContactId = async (contactId: string): Promise<AxiosResponse<NylasContactSyncEntry[]>> => {
        return await this.invokeApi(`/syncEntries`, 'GET', undefined, { params: {contactId} });
    };

    /**
     * Retrieves the syncEntry with the given id
     * @param {string} syncEntryId - The id of a syncEntry
     * @return {NylasContactSyncEntry}
     */
    fetchBySyncEntryId = async (syncEntryId: string): Promise<AxiosResponse<NylasContactSyncEntry>> => {
        return await this.invokeApi(`/syncEntries/${syncEntryId}`, 'GET');
    };

    /**
     * Creates a syncEntry
     * @param {NylasContactSyncEntryPostModel} syncEntry - The syncEntry you want to create
     * @return {NylasContactSyncEntry}
     */
    createSyncEntry = async (syncEntry: NylasContactSyncEntryPostModel): Promise<AxiosResponse<NylasContactSyncEntry>> => {
        return await this.invokeApi(`/syncEntries`, 'POST', syncEntry);
    };

    /**
     * Delete a syncEntry by it's id
     * @param {string} syncEntryId - The id of a syncEntry
     */
    deleteSyncEntryById = async (syncEntryId: string): Promise<AxiosResponse> => {
        return await this.invokeApi(`/syncEntries/${syncEntryId}`, 'DELETE');
    };
}

export default new NylasContactSyncService();
