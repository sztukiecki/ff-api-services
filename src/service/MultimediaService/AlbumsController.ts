import { APIClient, APIMapping } from '../../http';
import { Album } from './MultimediaService.Types';

export class AlbumsController extends APIClient {

    constructor() {
        super(APIMapping.multimediaService);
    }

    /**
     * Fetches all available album definitions for a schema
     * @param schemaName
     */
    async fetchAlbums(schemaName: string) {
        return await this.invokeApiWithErrorHandling<Album>(`/albums/schemas/${schemaName}`, 'GET');
    }

    /**
     * Fechtes a specific album
     * @param albumName
     * @param schemaName
     */
    async fetchAlbum(albumName: string, schemaName: string) {
        return await this.invokeApiWithErrorHandling<Album>(`/albums/${albumName}/schemas/${schemaName}`);
    }

    /**
     * Creates a new local album for the current company
     * @param album
     */
    async createAlbum(album: Album) {
        return await this.invokeApiWithErrorHandling<Album>('/albums', 'POST', album);
    }

    /**
     * Updates a album
     * @param albumId
     * @param album
     */
    async updateAlbum(albumId: string, album: Album) {
        return await this.invokeApiWithErrorHandling<Album>(`/albums/${albumId}`, 'PUT', album);
    }

    /**
     * Deletes a local album for the current company
     * @param albumId
     */
    async deleteAlbum(albumId: string) {
        return await this.invokeApiWithErrorHandling<Album>(`/albums/${albumId}`, 'DELETE');
    }
}
