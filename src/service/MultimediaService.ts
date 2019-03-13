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
    upload(file: any, entityId: string): Promise<AxiosResponse> {
        const formData = new FormData();
        formData.append('file', file);

        return this.invokeApi(`/upload/${entityId}`, 'POST', formData, {
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
    fetchFile(fileUrl: string): Promise<AxiosResponse> {
        return this.invokeApi(`/download`, 'GET', undefined, {
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
    deleteFile(bucketType: 'Image' | 'Document', entityId: string, filename: string): Promise<AxiosResponse> {
        return this.invokeApi(`/deleteFile`, 'DELETE', {
            bucketType,
            entityId,
            filename
        });
    }
}

export default new MultimediaService();
