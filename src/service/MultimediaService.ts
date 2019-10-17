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
}

export default new MultimediaService();
