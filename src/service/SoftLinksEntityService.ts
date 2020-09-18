import { AxiosResponse } from 'axios';
import { APIClient, APIMapping } from '../http';
import { Softlinks, PagedResult } from '@flowfact/types';

export class SoftLinksEntityService extends APIClient {
    constructor() {
        super(APIMapping.softLinksEntityService);
    }

    /**
     * Create link between the entities with ids from source and destination
     * @param link
     */
    async createLink(link: Softlinks.CreateSoftlinkRequest): Promise<AxiosResponse<Softlinks.Softlink>> {
        return this.invokeApi(`/link`, 'POST', link || {}, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    /**
     * Delete link
     * @param linkId
     */
    async deleteLink(linkId: string): Promise<AxiosResponse> {
        return this.invokeApi(`/link/${linkId}`, 'DELETE');
    }

    /**
     * Search link by label
     * @param label
     */
    async searchLinksByLabel(label: string): Promise<AxiosResponse<{ count: number; label: string }>> {
        return this.invokeApi(`/link/search`, 'GET', undefined, {
            queryParams: {
                label,
            },
        });
    }

    /**
     * Search links with pagination
     * @param link
     * @param page
     * @param size
     */
    async searchLinksWithPagination(
        link: Softlinks.NulleableSoftlinkSearch,
        page: number = 1,
        size: number = 20
    ): Promise<AxiosResponse<PagedResult<Softlinks.Softlink>>> {
        return this.invokeApi(`/link/search`, 'POST', link || {}, {
            queryParams: {
                page,
                size,
            },
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    /**
     * Search all links with pagination
     * @param request
     * @param page
     * @param size
     */
    async searchAllSoftLinks(
        request: Softlinks.AllSoftlinksRequest,
        page: number = 1,
        size: number = 20
    ): Promise<AxiosResponse<PagedResult<Softlinks.Softlink>>> {
        return this.invokeApi(`/link/search/all-softlinks`, 'POST', request || {}, {
            queryParams: {
                page,
                size,
            },
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

export default new SoftLinksEntityService();
