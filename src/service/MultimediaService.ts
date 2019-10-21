import { APIClient, APIMapping } from '../http';
import { AxiosResponse } from 'axios';

export class MultimediaService extends APIClient {

    constructor() {
        super(APIMapping.multimediaService);
    }

    /**
     * Upload a file for a entity
     *
     * @param file
     * @param entityId
     * @returns
     *      the url to request this file
     */
    async upload(file: any, entityId: string): Promise<AxiosResponse> {
        const formData = new FormData();
        formData.append('file', file);

        return await this.invokeApi(`/upload/${entityId}`, 'POST', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    /**
     * Fetches the file
     *
     * @param fileUrl
     * @returns
     *      the url to request this file
     */
    async fetchFile(fileUrl: string): Promise<AxiosResponse> {
        return await this.invokeApi('/download', 'GET', undefined, {
            queryParams: {
                uri: fileUrl
            },
            headers: {
                Accept: 'application/octet-stream'
            },
            responseType: 'arraybuffer'
        });
    }

    /**
     * Fetchs all media items of the current company.
     * @param entityId
     */
    async fetchAllMediaItemsOfCurrentCompany(entityId: string) {
        return await this.invokeApi(`/items/entities/${entityId}`, 'GET');
    }

    /**
     * Fetchs a Multimedia item by his id
     * @param mediaItemId
     */
    async fetchMediaItem(mediaItemId: number) {
        return await this.invokeApi(`/items/${mediaItemId}`, 'GET');
    }

    /**
     * Deletes an multimedia item and removes alles assignments.
     * @param mediaItemId
     */
    async deleteMediaItem(mediaItemId: number) {
        return await this.invokeApi(`/items/${mediaItemId}`, 'DELETE');
    }

    /**
     * Deletes a file from S3
     *
     * @returns well.. 200 OK?
     */
    async deleteFile(bucketType: 'Image' | 'Document', entityId: string, filename: string): Promise<AxiosResponse> {
        return await this.invokeApi('/deleteFile', 'DELETE', {
            bucketType,
            entityId,
            filename
        });
    }

    /**
     * Fetches all available album definitions for a schema
     * @param schemaName
     */
    async fetchAlbums(schemaName: string): Promise<AxiosResponse> {
        return await this.invokeApi(`/albums/schemas/${schemaName}`, 'GET');
    }

    /**
     * Adds an link to an entity
     * @param schemaName
     *      The name of the schema
     * @param entityId
     *      The uuid of the entity
     * @param url
     *      The url
     */
    async addLink(schemaName: string, entityId: string, url: string) {
        return await this.invokeApi(`/upload/schema/${schemaName}/entity/${entityId}/link`, 'POST', undefined, {
            queryParams: {
                link: encodeURI(url)
            }
        });
    }

    /**
     * Fetches all assigned media item of a given album. Use the short parameter if you just want to get ids.
     * @param entityId
     * @param albumName
     * @param short
     */
    async fetchAssignedMediaItems(entityId: string, albumName: string, short: boolean = false) {
        return await this.invokeApi(`/assigned/entities/${entityId}`, 'GET', undefined, {
            queryParams: {
                albumName: albumName,
                short: short
            }
        });
    }

    /**
     * Get all unassiged media items of a given album. Use the short parameter if you just want to get ids.
     * @param entityId
     * @param albumName
     * @param short
     */
    async fetchUnassignedMediaItems(entityId: string, albumName: string, short: boolean = false) {
        return await this.invokeApi(`/unassigned/entities/${entityId}`, 'GET', undefined, {
            queryParams: {
                albumName: albumName,
                short: short
            }
        });
    }
}

export default new MultimediaService();
