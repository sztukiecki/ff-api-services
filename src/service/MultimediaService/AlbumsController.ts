import { APIClient, APIMapping } from '../../http';
import { Album } from '@flowfact/types';
import { ApiResponseError, ApiResponseSuccess } from '../../http/APIClient';

export class AlbumsController extends APIClient {

    constructor() {
        super(APIMapping.multimediaService);
    }

    /**
     * Fetches all available album definitions for a schema
     * @param schemaName
     */
    async fetchAlbums(schemaName: string): Promise<ApiResponseSuccess<Album> | ApiResponseError<any>> {
        return await this.invokeApiWithErrorHandling(`/albums/schemas/${schemaName}`, 'GET');
    }

    /**
     * Fechtes a specific album
     * @param albumName
     * @param schemaName
     */
    async fetchAlbum(albumName: string, schemaName: string): Promise<ApiResponseSuccess<Album> | ApiResponseError<any>> {
        return await this.invokeApiWithErrorHandling(`/albums/${albumName}/schemas/${schemaName}`);
    }
}
