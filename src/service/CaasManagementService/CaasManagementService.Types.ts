export namespace CaasManagementServiceTypes {

    /*
    *
    * CONTAINERS
    *
    */

    export interface ContainerCreate {
        name: string;
        memory: number;
        niceNames: string[];
        imageRepoName: string;
        imageTagName: ImageTagName;
        containerPort: number;
        environment: ContainerEnvironment | WordpressContainerEnvironment;
        projectId: string;
        tags?: ContainerTags;
        roles?: string[];
    }

    export interface Container {
        id: string;
        details: ContainerDetails;
        status: ContainerStatus;
    }

    export interface GetAllContainersResponse {
        items: Container[];
        total: number;
        pageSize: number;
    }

    export interface GetContainerDefaultDomainResponse {
        defaultDomain: string;
        containerId: string;
    }

    export interface ContainerDetails {
        name: string;
        memory: number;
        niceNames: string[];
        imageRepoName: string;
        imageTagName: ImageTagName;
        containerPort: number;
        environment: ContainerEnvironment | WordpressContainerEnvironment;
        endpoint: string;
        projectId: string;
        tags?: ContainerTags;
        roles?: string[];
    }

    export interface ContainerTags {
        [key: string]: string;
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
    export type ImageTagName = 'latest';

    export interface NiceNameAvailableResponse {
        unique: boolean;
    }

    export interface ContainerLogsResponse {
        logs: ContainerLogMap;
    }

    export interface ContainerLogMap {
        [key: string]: ContainerLog[];
    }

    export interface ContainerLog {
        timestamp: number;
        message: string;
        utcIsoFormattedTimestamp: string;
    }

    /*
    *
    * DATABASES
    *
    */

    export interface DatabaseCreate {
        label: string;
        tenancy: DatabaseTenancy;
        projectId: string;
        tags?: DatabaseTags;
    }

    export interface Database {
        id: string;
        companyId: string;
        details: DatabaseDetails;
        status: DatabaseStatus;
    }

    export interface GetAllDatabasesResponse {
        items: Database[];
        total: number;
        pageSize: number;
    }

    export interface DatabaseDetails {
        label: string;
        name: string;
        userName: string;
        userPassword: string;
        databaseName: string;
        endpoint: string;
        port: number;
        tags?: DatabaseTags;
    }

    export interface DatabaseTags {
        [key: string]: string;
    }

    export type DatabaseStatus =
        'RUNNING'
        | 'MAINTENANCE'
        | 'CREATING'
        | 'STARTING'
        | 'STOPPING'
        | 'STOPPED'
        | 'DELETING'
        | 'FAILED'
        | 'UNKNOWN';

    export type DatabaseTenancy = 'shared' | 'dedicated';

    /*
    *
    * PROJECTS
    *
    */

    export interface ProjectCreate {
        name: string;
        tags?: ProjectTags;
        roles?: string[];
    }

    export interface Project {
        id: string;
        companyId: string;
        details: ProjectDetails;
    }

    export interface ProjectTags {
        [key: string]: string;
    }

    export interface GetAllProjectsResponse {
        items: Project[];
        total: number;
        pageSize: number;
    }

    export interface ProjectDetails {
        id: string;
        name: string;
        containers: string[];
        databases: string[];
        tags: ProjectTags;
        roles: string[];
    }
}
