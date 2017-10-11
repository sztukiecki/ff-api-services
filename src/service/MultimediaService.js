import HttpClient, {APIMapping} from '../http';

export default class MultimediaService {

    static client = new HttpClient(APIMapping.multimediaService);

    /**
     * Upload a file for a entity
     *
     * @param file
     * @param entityId
     * @returns
     *      the url to request this file
     */
    static upload(file, entityId) {
        const formData = new FormData();
        formData.append('file', file);

        return this.client.makeRequest(`/upload/${entityId}`, 'POST', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
}
