import axios, { AxiosRequestConfig, AxiosResponse, CancelToken } from 'axios';
import * as isNode from 'detect-node';
import { stringify } from 'qs';
import Authentication from '../authentication/Authentication';
import EnvironmentManagement from '../util/EnvironmentManagement';
import Interceptor from '../util/Interceptor';
import { APIService } from './APIMapping';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, IntrospectionFragmentMatcher, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import fragmentTypes from '../schemas/fragmentTypes';

export type ParamMap = { [key: string]: string | boolean | number | undefined };

export interface APIClientAdditionalParams extends AxiosRequestConfig {
    headers?: string | ParamMap;
    queryParams?: ParamMap;
    cancelToken?: CancelToken;
}

export type MethodTypes = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'OPTIONS' | 'PATCH' | 'HEAD';

export default abstract class APIClient {

    private userId: string;
    private readonly _serviceName: string;
    private static languages: string = 'de';
    private gql: ApolloClient<NormalizedCacheObject>;

    public static changeLanguages(newLanguages: string) {
        this.languages = newLanguages;
    }

    protected constructor(service: APIService) {
        this._serviceName = service.name;

        const fragmentMatcher = new IntrospectionFragmentMatcher({ introspectionQueryResultData: fragmentTypes });

        const httpLink = new HttpLink({
            uri: `${EnvironmentManagement.getBaseUrl(isNode)}/gql`
        });
        const authLink = setContext(async (_, { headers }) => ({
            headers: {
                ...headers,
                ...(await this.getUserIdentification())
            }
        }));
        const link = authLink.concat(httpLink);
        const cache = new InMemoryCache({ fragmentMatcher });
        this.gql = new ApolloClient({
            link,
            cache
        });
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
                    userId: this.userId
                };
            }
            return {};
        }

        const supportToken = localStorage.getItem('flowfact.support.token') || '';

        if (supportToken.length === 0) {
            return {
                cognitoToken: (await Authentication.getCurrentSession())!.getIdToken()!.getJwtToken()
            };
        } else {
            return {
                'x-ff-support-token': supportToken
            };
        }
    }

    public async invokeGqlQuery<T = any>(query: any, variables?: any) {
        const result = await this.gql.query<T>({ query, variables, errorPolicy: 'all' });
        if (result.errors) {
            if (result.data) {
                console.warn('GQL query has warnings', result.errors);
            } else {
                // tslint:disable-next-line:no-console
                console.error('GQL query failed', result.errors);
            }
        }
        return result;
    }

    public async invokeGqlMutation<T = any>(mutation: any, variables?: any) {
        const result = await this.gql.mutate<T>({ mutation, variables, errorPolicy: 'all' });
        if (result.errors) {
            if (result.data) {
                console.warn('GQL mutation has warnings', result.errors);
            } else {
                // tslint:disable-next-line:no-console
                console.error('GQL mutation failed', result.errors);
            }
        }
        return result;
    }

    public async invokeApi<T = any>(path: string, method: MethodTypes = 'GET', body: string | {} = '', additionalParams: APIClientAdditionalParams = {}): Promise<AxiosResponse<T>> {
        if (!path.startsWith('/')) {
            throw new Error('Your path has to start with a slash. Path: ' + path);
        }

        const { queryParams, headers, cancelToken, ...others } = additionalParams;

        // add parameters to the url
        let apiUrl = `${EnvironmentManagement.getBaseUrl(isNode)}/${this._serviceName}${path}`;
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
            ...others
        };

        const client = axios.create();
        for (const interceptor of Interceptor.interceptors) {
            if (interceptor.type === 'request') {
                axios.interceptors.request.use(interceptor.method);
            } else if (interceptor.type === 'response') {
                axios.interceptors.response.use(interceptor.method);
            }
        }

        // fire the request
        // NEVER put a catch here because it prevents all other error handling
        // i.e. you can't handle a service returning an http code >= 400 (which is possibly expected)
        return client.request<T>(request);
    }
}
