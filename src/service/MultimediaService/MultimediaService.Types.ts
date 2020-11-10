import { Captions } from '@flowfact/types';

export type ContentCategory = 'IMAGE' | 'DOCUMENT' | 'LINK' | 'VIDEO';

export interface MultimediaItem {
    id: number;
    createdAt: number;
    entityId: string;
    schemaName: string;
    description?: string;
    title?: string;
    fileName?: string;
    contentType?: string;
    contentCategory: ContentCategory;
    fileReference: string;
    fileSize?: number;
}

export interface AlbumAssignmentRequest {
    albumName: string;
    categories?: string[];
}

export interface MultimediaAssignments {
    assignments: {
        [key: string]: MultimediaAssignment[];
    };
}

export interface MultimediaAssignment {
    multimedia: number | MultimediaItem;
    sorting: number;
}

export interface Category {
    id: string;
    name: string;
    captions: Captions;
    maxItems?: number;
    sorting: number;
    allowedContentCategories: ContentCategory[];
}

export interface Album {
    id: string;
    schema: string;
    name: string;
    captions: Captions;
    categories: Category[];
}

export interface UploadResponse {
    multimediaItem: object | number;
}
