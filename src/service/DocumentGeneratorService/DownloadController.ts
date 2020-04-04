import { APIClient, APIMapping } from '../../http';

class DownloadController extends APIClient {

    constructor() {
        super(APIMapping.documentGeneratorService);
    }

    /**
     * Downloads a document from s3
     * @param s3Url
     */
    async downloadDocument(s3Url: string) {
        return this.invokeApiWithErrorHandling<ArrayBuffer>('/download', 'GET', undefined, {
            queryParams: {
                uri: s3Url
            },
            headers: {
                Accept: 'application/octet-stream'
            },
            responseType: 'arraybuffer'
        });
    }

}

export default DownloadController;
