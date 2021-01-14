import { AxiosError, AxiosRequestConfig, AxiosResponse, CancelToken } from 'axios';
import * as isNode from 'detect-node';
import { stringify } from 'qs';
import Authentication from '../authentication/Authentication';
import { EnvironmentManagementInstance } from '../util/EnvironmentManagement';
import { APIService } from './APIMapping';
import axiosETAGCache from './cache';

export type ParamMap = { [key: string]: string | boolean | number | undefined };

export interface APIClientAdditionalParams extends AxiosRequestConfig {
    headers?: string | ParamMap;
    queryParams?: ParamMap;
    cancelToken?: CancelToken;
}

export type MethodTypes = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'OPTIONS' | 'PATCH' | 'HEAD';

export abstract class APIClient {
    private userId: string;
    private readonly _serviceName: string;
    private static languages: string = 'de';

    public static changeLanguages(newLanguages: string) {
        this.languages = newLanguages;
    }

    protected constructor(service: APIService) {
        this._serviceName = service.name;
    }

    public withUserId(userId: string): this {
        this.userId = userId;
        return this;
    }

    private async getUserIdentification() {
        // setup the request
        if (isNode) {
            if (this.userId) {
                return {
                    userId: this.userId,
                };
            }
            return {};
        }

        const supportToken = localStorage.getItem('flowfact.support.token') || '';
        const apiToken = localStorage.getItem('flowfact.api.token') || '';

        if (supportToken.length === 0 && apiToken.length === 0) {
            return {
                cognitoToken: (await Authentication.getCurrentSession())!.getIdToken()!.getJwtToken(),
            };
        } else {
            return {
                [`x-ff-${apiToken ? 'api' : 'support'}-token`]: apiToken || supportToken,
            };
        }
    }

    public async getAuthenticationToken(): Promise<string> {
        const userIdentification = await this.getUserIdentification();
        return userIdentification.cognitoToken || userIdentification['x-ff-support-token'];
    }

    public async invokeApi<T = any>(
        path: string,
        method: MethodTypes = 'GET',
        body: string | {} = '',
        additionalParams: APIClientAdditionalParams = {}
    ): Promise<AxiosResponse<T>> {
        if (!path.startsWith('/')) {
            throw new Error('Your path has to start with a slash. Path: ' + path);
        }

        const { queryParams, headers, cancelToken, ...others } = additionalParams;

        // add parameters to the url
        let apiUrl = `${EnvironmentManagementInstance.getBaseUrl(isNode)}/${this._serviceName}${path}`;

        if (this._serviceName === 'entitlement-lambda') {
            apiUrl = `https://entitlement-lambda.development.sf.flowfact-dev.cloud/${path}`;
        }

        if (queryParams) {
            const queryString = stringify(queryParams, { addQueryPrefix: true });
            if (queryString && queryString !== '') {
                apiUrl += queryString;
            }
        }

        const userIdentification = path.startsWith('/public') ? {} : await this.getUserIdentification();
        const languages: any = { 'Accept-Language': APIClient.languages };

        let request: AxiosRequestConfig = {
            method: method,
            url: apiUrl,
            headers: Object.assign({}, userIdentification, languages, headers || {}),
            data: body,
            cancelToken: cancelToken,
            ...others,
        };

        const client = axiosETAGCache();
        // fire the request
        // NEVER put a catch here because it prevents all other error handling
        // i.e. you can't handle a service returning an http code >= 400 (which is possibly expected)
        return client.request<T>(request);
    }

    public async invokeApiWithErrorHandling<T = any>(
        path: string,
        method: MethodTypes = 'GET',
        body: string | {} = '',
        additionalParams: APIClientAdditionalParams = {},
        defaultValue?: T
    ): Promise<ApiResponse<T>> {
        try {
            const result = await this.invokeApi<T>(path, method, body, additionalParams);
            const response: ApiResponse<T> = {
                isSuccessful2xx: result.status >= 200 && result.status < 300,
                status: 0,
            };

            return !result
                ? response
                : {
                      ...response,
                      ...result,
                      data: result.data ? result.data : defaultValue,
                  };
        } catch (error) {
            return {
                ...error,
                status: error?.response?.status,
                isSuccessful2xx: false,
                data: error?.response?.data ?? defaultValue,
            };
        }
    }
}

export interface ApiResponseSuccess<T> extends Partial<AxiosResponse<T>> {
    isSuccessful2xx: true;
}

export interface ApiResponseError<T> extends Partial<AxiosError<T>> {
    isSuccessful2xx: false | undefined;
    status: number;
    data?: T;
}

export type ApiResponse<T> = ApiResponseSuccess<T> | ApiResponseError<T>;
