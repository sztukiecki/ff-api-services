# 13.x
- introduced new folder structure for services
- introduced new invokeApi (invokeApiWithErrorHandling) which doesnt throw errors and returns an ApiResponse (see below)
- added template for services 
- flywheel services & openimmoftpaccess service types are now provided wrapped with namespaces

`Breaking Changes`
- currently affected by new folder structure are flywheel service and openimmoftpaccess service
- removed internal types from index export
 



### ApiResponse
```typescript
export interface ApiResponseSuccess<T> extends Partial<AxiosResponse<T>> {
    isSuccessful2xx: true;
}

export interface ApiResponseError<T> extends Partial<AxiosError<T>> {
    isSuccessful2xx: false;
    data?: T
}

export type ApiResponse<T> = ApiResponseSuccess<T> | ApiResponseError<T>;
``` 
