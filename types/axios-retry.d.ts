declare module 'axios-retry' {
    import {AxiosError, AxiosInstance, AxiosStatic} from 'axios';

    interface AxiosRetryParams {
        retries?: number;
        retryCondition?: (error: AxiosError) => boolean;
    }

    namespace axiosRetry {}
    function axiosRetry(axios: AxiosInstance | AxiosStatic, params: AxiosRetryParams): void;
    export = axiosRetry;
}
