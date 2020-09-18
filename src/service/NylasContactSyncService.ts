import { PagedNylasContactSyncEntries, NylasContactSyncEntry, NylasContactSyncEntryPostModel } from '@flowfact/types';
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
     * @param {number} page - The page you need to set to paginate (default: 1)
     * @param {number} size - The amount of results per page (default: 25)
     * @return {NylasContactSyncEntry[]}
     */
    fetchByContactId = async (contactId: string, page: number = 1, size: number = 25): Promise<AxiosResponse<PagedNylasContactSyncEntries>> => {
        return await this.invokeApi(`/syncEntries`, 'GET', undefined, { params: { contactId, page, size } });
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
