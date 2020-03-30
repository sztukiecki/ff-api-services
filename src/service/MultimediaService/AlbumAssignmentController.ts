import { APIClient, APIMapping } from '../../http';
import { ApiResponseError, ApiResponseSuccess } from '../../http/APIClient';
import { Album, MultimediaAssignment, MultimediaAssignments } from './MultimediaService.Types';

export class AlbumAssignmentController extends APIClient {

    constructor() {
        super(APIMapping.multimediaService);
    }

    /**
     * Fetches all assigned media item of a given album. Use the short parameter if you just want to get ids.
     * @param schemaName
     * @param entityId
     * @param albumName
     * @param short
     */
    async fetchAssignments(schemaName: string, entityId: string, albumName: string, short: boolean = true): Promise<ApiResponseSuccess<MultimediaAssignments> | ApiResponseError<any>> {
        return await this.invokeApiWithErrorHandling(`/assigned/schemas/${schemaName}/entities/${entityId}`, 'GET', undefined, {
            queryParams: {
                albumName: albumName,
                short: short
            }
        });
    }

    /**
     * Get all unassigned media items of a given album. Use the short parameter if you just want to get ids.
     * @param entityId
     * @param albumName
     */
    async fetchUnassignedMediaItemIds(entityId: string, albumName: string | undefined = undefined): Promise<ApiResponseSuccess<{ unassignedIds: number[] }> | ApiResponseError<any>> {
        return await this.invokeApiWithErrorHandling(`/unassigned/entities/${entityId}`, 'GET', undefined, {
            queryParams: {
                albumName: albumName,
                short: true
            }
        });
    }

    /**
     * Update assignments of the given album.
     * @param schemaName
     * @param entityId
     * @param albumName
     * @param assignments
     */
    async updateAssignments(schemaName: string, entityId: string, albumName: string, assignments: { [key: string]: MultimediaAssignment[] }): Promise<ApiResponseSuccess<MultimediaAssignments> | ApiResponseError<any>> {
        return await this.invokeApiWithErrorHandling(
            `/assigned/schemas/${schemaName}/entities/${entityId}`, 'PUT',
            {
                assignments: assignments
            },
            {
                queryParams: {
                    albumName: albumName,
                    short: true
                }
            });
    }

    /**
     * Get all albums where a item is assigned too
     * @param schemaName
     * @param entityId
     * @param mediaItemId
     */
    async fetchAssignedAlbums(schemaName: string, entityId: string, mediaItemId: number): Promise<ApiResponseSuccess<{ albums: Album }> | ApiResponseError<any>> {
        return await this.invokeApiWithErrorHandling(`/assigned/schemas/${schemaName}/entities/${entityId}/items/${mediaItemId}`, 'GET');
    }

    /**
     * This function assign items to an album and add these items intelligent to any possible category if no categories are set.
     * @param schemaName
     * @param entityId
     * @param albumName
     * @param mediaItemIds
     * @param categories
     */
    async assignMediaItems(schemaName: string, entityId: string, albumName: string, mediaItemIds: Number[], categories: string[] = []): Promise<ApiResponseSuccess<any> | ApiResponseError<any>> {
        return await this.invokeApiWithErrorHandling(`/assigned/schemas/${schemaName}/entities/${entityId}/items`, 'PUT', {
            albumName: albumName,
            categories: categories,
            multimediaItemIds: mediaItemIds
        });
    }
}
