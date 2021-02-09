import { ApiCache } from './cache';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

async function requestInterceptor(config: AxiosRequestConfig) {
    if (isCacheableMethod(config)) {
        const cachedEtag = (await getCachedItem(config))?.headers?.etag;
        if (cachedEtag) {
            config.headers = { ...config.headers, 'If-None-Match': cachedEtag };
        }
    }
    return config;
}

function responseInterceptor(response: AxiosResponse) {
    if (isCacheableMethod(response.config) && response.headers?.etag) {
        ApiCache.set(response.config.url!, response.data, response.headers);
    }
    return response;
}

async function responseErrorInterceptor(error: AxiosError) {
    if (error.response && error.response.status === 304) {
        const cachedItem = await getCachedItem(error.response.config);
        if (cachedItem) {
            return Promise.resolve({ ...error.response, status: 200, data: cachedItem.body, headers: cachedItem.headers });
        }
    }
    return Promise.reject(error);
}

function isCacheableMethod(config: AxiosRequestConfig) {
    return ~['GET', 'HEAD'].indexOf((config.method as string).toUpperCase());
}

function getCachedItem(config: AxiosRequestConfig) {
    return ApiCache.get(config.url!);
}

export default function axiosETAGCache(config?: AxiosRequestConfig) {
    const instance = axios.create(config);
    const cacheStorageAvailable = typeof caches !== 'undefined';
    if (cacheStorageAvailable) {
        instance.interceptors.request.use(requestInterceptor);
        instance.interceptors.response.use(responseInterceptor, responseErrorInterceptor);
    }
    return instance;
}
