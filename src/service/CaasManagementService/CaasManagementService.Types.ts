export namespace CaasManagementServiceTypes {

    export namespace Container {

        export interface Create {
            name: string;
            memory: number;
            niceNames: string[];
            imageRepoName: string;
            imageTagName: ImageTagName;
            containerPort: number;
            environment: Environment | WordpressEnvironment;
            projectId: string;
            tags?: Tags;
            roles?: string[];
        }

        export interface Container {
            id: string;
            details: Details;
            status: Status;
        }

        export interface GetAllResponse {
            items: Container[];
            total: number;
            pageSize: number;
        }

        export interface GetDefaultDomainResponse {
            defaultDomain: string;
            containerId: string;
        }

        export interface Details {
            name: string;
            memory: number;
            niceNames: string[];
            imageRepoName: string;
            imageTagName: ImageTagName;
            containerPort: number;
            environment: Environment | WordpressEnvironment;
            endpoint: string;
            projectId: string;
            tags?: Tags;
            roles?: string[];
        }

        export interface Environment {
            SERVICE_NAME: string;
        }

        export interface WordpressEnvironment {
            WORDPRESS_DB_HOST: string;
            WORDPRESS_DB_USER: string;
            WORDPRESS_DB_PASSWORD: string;
            WORDPRESS_DB_NAME: string;
        }

        export type EcsServiceStatus = 'RUNNING' | 'STOPPING' | 'STOPPED' | 'UNKNOWN';
        export type ImageTagName = 'latest';

        export interface NiceNameAvailableResponse {
            unique: boolean;
        }

        export interface LogsResponse {
            logs: LogMap;
        }

        export interface LogMap {
            [key: string]: Log[];
        }

        export interface Log {
            timestamp: number;
            message: string;
            utcIsoFormattedTimestamp: string;
        }
    }

    export namespace Database {

        export interface Create {
            label: string;
            tenancy: Tenancy;
            projectId: string;
            tags?: Tags;
        }

        export interface Database {
            id: string;
            companyId: string;
            details: Details;
            status: Status;
        }

        export interface GetAllResponse {
            items: Database[];
            total: number;
            pageSize: number;
        }

        export interface Details {
            label: string;
            name: string;
            userName: string;
            userPassword: string;
            databaseName: string;
            endpoint: string;
            port: number;
            tags?: Tags;
        }

        export type Tenancy = 'shared' | 'dedicated';
    }

    export namespace Project {

        export interface Create {
            name: string;
            tags?: Tags;
            roles?: string[];
        }
    
        export interface Project {
            id: string;
            companyId: string;
            details: Details;
        }
    
        export interface GetAllResponse {
            items: Project[];
            total: number;
            pageSize: number;
        }
    
        export interface Details {
            id: string;
            name: string;
            containers: string[];
            databases: string[];
            tags: Tags;
            roles: string[];
        }
    }

    export interface Tags {
        [key: string]: string;
    }

    export type Status =
            'RUNNING'
            | 'MAINTENANCE'
            | 'CREATING'
            | 'STARTING'
            | 'STOPPING'
            | 'STOPPED'
            | 'DELETING'
            | 'FAILED'
            | 'UNKNOWN';
}
