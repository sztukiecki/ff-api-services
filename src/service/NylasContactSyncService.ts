import { AxiosResponse } from 'axios';
import APIClient from '../http/APIClient';
import APIMapping from '../http/APIMapping';
import { NylasContactSyncEntry } from '@flowfact/types';

export class NylasContactSyncService extends APIClient {

    constructor() {
        super(APIMapping.nylasContactSyncService);
    }

    /**
     * Retrieves all syncEntries for a given companyId and entityId
     * @param companyId - The id of a company
     * @param contactId - The id of a contact
     */
    fetchByCompanyAndEntityId = async (params: { companyId: string, contactId: string }): Promise<AxiosResponse<NylasContactSyncEntry[]>> => {
        return await this.invokeApi(`/syncEntries`, 'GET', undefined, { params });
    };

    /**
     * Retrieves all syncEntries for a given companyId and entityId
     * @param syncEntryId - The id of a syncEntry
     */
    fetchBySyncEntryId = async (syncEntryId: string): Promise<AxiosResponse<NylasContactSyncEntry>> => {
        return await this.invokeApi(`/syncEntries/${syncEntryId}`, 'GET');
    };

    /**
     * Creates a syncEntry
     * @param syncEntry - A syncEntry
     */
    createSyncEntry = async (syncEntry: any): Promise<AxiosResponse<NylasContactSyncEntry>> => {
        return await this.invokeApi(`/syncEntries`, 'POST', syncEntry);
    };

    /**
     * Delete a syncEntry by it's id
     * @param syncEntryId - The id of a syncEntry
     */
    deleteSyncEntryById = async (syncEntryId: string): Promise<AxiosResponse> => {
        return await this.invokeApi(`/syncEntries/${syncEntryId}`, 'DELETE');
    };
}

export default new NylasContactSyncService();
