export interface EntityPickData {
    entityId: string;
    schemaName: string;
    alias: string;
}

export interface UserInputData {
    value: string;
    alias: string;
}

export type GenerationStatusType = 'PENDING' | 'SUCCESS' | 'ERROR';
export interface GenerationStatus {
    id: string;
    s3Url: string;
    type: GenerationStatusType;
    created: Date;
}

export type SaveFormat = 'pdf' | 'docx';
