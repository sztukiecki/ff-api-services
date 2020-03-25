import { AlbumAssignmentController } from './AlbumAssignmentController';
import { ItemsController } from './ItemsController';
import { AlbumsController } from './AlbumsController';

export class MultimediaService {

    public static instance = new MultimediaService();

    public readonly albumAssignment: AlbumAssignmentController;
    public readonly items: ItemsController;
    public readonly albums: AlbumsController;

    constructor() {
        this.albumAssignment = new AlbumAssignmentController();
        this.items = new ItemsController();
        this.albums = new AlbumsController();
    }

}

export const MultimediaServiceInstance = new MultimediaService();
