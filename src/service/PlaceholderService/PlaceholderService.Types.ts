export namespace PlaceholderServiceTypes {
    export interface EntityPlaceholderMetadata {
        entityId: string;
        schemaId: string;
        schema: string;
        key: string;
        externalSources: object;
    }

    export interface EntityPlaceholder {
        type: 'ENTITY';
        metadata: EntityPlaceholderMetadata;
    }

    export interface CompanyPlaceholder {
        type: 'COMPANY';
    }

    export interface UserPlaceholderMetadata {
        userId: string;
    }

    export interface UserPlaceholder {
        type: 'USER';
        metadata: UserPlaceholderMetadata;
    }

    export type PlaceholderRequest = (EntityPlaceholder | UserPlaceholder | CompanyPlaceholder)[];
}
