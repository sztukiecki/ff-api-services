import HttpClient, {APIMapping} from '../http';

export default class MultimediaService {

    static client = new HttpClient(APIMapping.multimediaService);

    /**
     * Upload a file for a entity
     *
     * @param file
     * @param companyId
     * @param entityId
     * @returns
     *      the url to request this file
     */
    static upload(file, companyId, entityId) {
        const formData = new FormData();
        formData.append('file', file);

        return this.client.makeRequest({}, `/${companyId}/${entityId}`, 'POST', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
}
