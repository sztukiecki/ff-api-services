import { APIClient, APIMapping } from '../../http';
import { AlbumAssignmentRequest, MultimediaItem, UploadResponse } from '@flowfact/types';
import { ApiResponseError, ApiResponseSuccess } from '../../http/APIClient';

export class ItemsController extends APIClient {

    constructor() {
        super(APIMapping.multimediaService);
    }

    /**
     * Update image binary of item with itemId
     * @param image
     * @param itemId
     * @returns the url and the new eTag
     */
    async updateImage(image: FormData, itemId: string): Promise<ApiResponseSuccess<any> | ApiResponseError<any>> {
        return await this.invokeApiWithErrorHandling(`/items/${itemId}/file`, 'POST', image, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    /**
     * @Deprecated
     * Upload a file for a entity
     *
     * @param file
     * @param entityId
     * @returns
     *      the url to request this file
     */
    async upload(file: any, entityId: string): Promise<ApiResponseSuccess<any> | ApiResponseError<any>> {
        const formData = new FormData();
        formData.append('file', file);

        return await this.invokeApiWithErrorHandling(`/upload/${entityId}`, 'POST', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    /**
     * @Deprecated
     * Fetches the file
     *
     * @param fileUrl
     * @returns
     *      the url to request this file
     */
    async fetchFile(fileUrl: string): Promise<ApiResponseSuccess<any> | ApiResponseError<any>> {
        return await this.invokeApiWithErrorHandling('/download', 'GET', undefined, {
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
     * @param contentCategory
     */
    async fetchMediaItems(entityId: string, contentCategory: string | undefined = undefined): Promise<ApiResponseSuccess<any> | ApiResponseError<any>> {
        return await this.invokeApiWithErrorHandling(`/items/entities/${entityId}`, 'GET', undefined, {
            queryParams: {
                contentCategory: contentCategory
            }
        });
    }

    /**
     * Fetchs a Multimedia item by his id
     * @param mediaItemId
     */
    async fetchMediaItem(mediaItemId: number): Promise<ApiResponseSuccess<MultimediaItem> | ApiResponseError<any>> {
        return await this.invokeApiWithErrorHandling(`/items/${mediaItemId}`, 'GET');
    }

    /**
     * Deletes an multimedia item and removes alles assignments.
     * @param mediaItemId
     */
    async deleteMediaItem(mediaItemId: number): Promise<ApiResponseSuccess<any> | ApiResponseError<any>> {
        return await this.invokeApiWithErrorHandling(`/items/${mediaItemId}`, 'DELETE');
    }

    /**
     * Deletes a file from S3
     *
     * @returns well.. 200 OK?
     */
    async deleteFile(bucketType: 'Image' | 'Document', entityId: string, filename: string): Promise<ApiResponseSuccess<any> | ApiResponseError<any>> {
        return await this.invokeApiWithErrorHandling('/deleteFile', 'DELETE', {
            bucketType,
            entityId,
            filename
        });
    }

    /**
     * Uploads a multimedia item.
     * @param schemaName
     *      The name of the current schema
     * @param entityId
     *      The uuid of the current entity
     * @param file
     *      The file that should be uploaded
     * @param onUploadProgress
     *      Callback function to get the current upload progress
     * @param albumAssignments
     *      Some album assignments.
     */
    async uploadMediaItem(
        schemaName: string,
        entityId: string,
        file: any,
        onUploadProgress: (progressEvent: any) => void = () => {},
        albumAssignments: AlbumAssignmentRequest[] = []
    ): Promise<ApiResponseSuccess<UploadResponse> | ApiResponseError<any>> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('albumAssignments', JSON.stringify(albumAssignments));

        return await this.invokeApiWithErrorHandling(`/items/schemas/${schemaName}/entities/${entityId}`, 'POST', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: onUploadProgress
        });
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
    async addLink(schemaName: string, entityId: string, url: string, albumAssignments: AlbumAssignmentRequest[] = []): Promise<ApiResponseSuccess<UploadResponse> | ApiResponseError<any>> {
        const body = {
            link: url,
            albumAssignments: albumAssignments
        };

        return await this.invokeApiWithErrorHandling(`/items/schemas/${schemaName}/entities/${entityId}/link`, 'POST', body);
    }

    /**
     * Updates a property of a media item
     * @param mediaItemId
     * @param jsonPatch
     */
    async patchMediaItem(mediaItemId: number, jsonPatch: object[]): Promise<ApiResponseSuccess<MultimediaItem> | ApiResponseError<any>> {
        return await this.invokeApiWithErrorHandling(`/items/${mediaItemId}`, 'PATCH', jsonPatch);
    }
}
