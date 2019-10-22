import { APIClient, APIMapping } from '../http';
import { AxiosResponse } from 'axios';
import { Album, MultimediaAssignments, MultimediaItem, UploadRequestItem } from '@flowfact/types';

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
     * Fetchs all media items of the current company and the given entity.
     * @param entityId
     */
    async fetchMediaItems(entityId: string) {
        return await this.invokeApi(`/items/entities/${entityId}`, 'GET');
    }

    /**
     * Fetchs a Multimedia item by his id
     * @param mediaItemId
     */
    async fetchMediaItem(mediaItemId: number): Promise<AxiosResponse<MultimediaItem>> {
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
    async fetchAlbums(schemaName: string): Promise<AxiosResponse<Album[]>> {
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
     * @param albumAssignments
     */
    async addLink(schemaName: string, entityId: string, url: string, albumAssignments: UploadRequestItem[] = []) {
        return await this.invokeApi(`/upload/schema/${schemaName}/entity/${entityId}/link`, 'POST', {
            link: url,
            albums: albumAssignments
        }, {headers: {'x-ff-version': 2}});
    }

    /**
     * Updates a property of a media item
     * @param mediaItemId
     * @param jsonPatch
     */
    async patchMediaItem(mediaItemId: number, jsonPatch: object[]): Promise<AxiosResponse<MultimediaItem>> {
        return await this.invokeApi(`/items/${mediaItemId}`, 'PATCH', jsonPatch);
    }

    /**
     * Fetches all assigned media item of a given album. Use the short parameter if you just want to get ids.
     * @param schemaName
     * @param entityId
     * @param albumName
     */
    async fetchAssignments(schemaName: string, entityId: string, albumName: string): Promise<AxiosResponse<MultimediaAssignments>> {
        return await this.invokeApi(`/assigned/schemas/${schemaName}/entities/${entityId}`, 'GET', undefined, {
            queryParams: {
                albumName: albumName,
                short: true
            }
        });
    }

    /**
     * Get all unassigned media items of a given album. Use the short parameter if you just want to get ids.
     * @param entityId
     * @param albumName
     */
    async fetchUnassignedMediaItemIds(entityId: string, albumName: string): Promise<AxiosResponse<{ unassignedIds: number[] }>> {
        return await this.invokeApi(`/unassigned/entities/${entityId}`, 'GET', undefined, {
            queryParams: {
                albumName: albumName,
                short: true
            }
        });
    }
}

export default new MultimediaService();
