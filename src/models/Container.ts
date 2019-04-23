export interface ContainerCreateModel {
    name: string;
    memory: number;
    niceNames: string[];
    imageRepoName: ImageRepoNames;
    imageTagName: ImageTagName;
    containerPort: number;
    environment: ContainerEnvironment | WordpressContainerEnvironment;
}

export interface ContainerResponse {
    id: string;
    details: ContainerDetails;
    status: ContainerStatus;
}

export interface ContainerUpdateModel {
    name: string;
    memory: number;
    niceNames: string[];
    imageRepoName: ImageRepoNames;
    persistentStoragePath: string;
    imageTagName: ImageTagName;
    containerPort: number;
    environment: ContainerEnvironment | WordpressContainerEnvironment;
}

export interface ContainerLogsResponse {
    logs: {
        [key: string]: ContainerLog[]
    };
}

export interface ContainerLog {
    timestamp: number;
    message: string;
    utcIsoFormattedTimestamp: string;
}

export interface GetAllContainersResponse {
    items: ContainerShortModel[];
}

export interface ContainerShortModel {
    id: string;
    name: string;
    status: ContainerStatus;
}

export interface ContainerDetails {
    name: string;
    memory: number;
    niceNames: string[];
    imageRepoName: ImageRepoNames;
    imageTagName: ImageTagName;
    containerPort: number;
    environment: ContainerEnvironment | WordpressContainerEnvironment;
    endpoint: string;
}

export interface ContainerEnvironment {
    SERVICE_NAME: string;
}

export interface WordpressContainerEnvironment {
    WORDPRESS_DB_HOST: string;
    WORDPRESS_DB_USER: string;
    WORDPRESS_DB_PASSWORD: string;
    WORDPRESS_DB_NAME: string;
}

export type ContainerStatus =
    'RUNNING'
    | 'MAINTENANCE'
    | 'CREATING'
    | 'STARTING'
    | 'STOPPING'
    | 'STOPPED'
    | 'DELETING'
    | 'FAILED'
    | 'UNKNOWN';
export type EcsServiceStatus = 'RUNNING' | 'STOPPING' | 'STOPPED' | 'UNKNOWN';
export type ImageRepoNames = 'nginx' | 'wordpress';
export type ImageTagName = 'latest';