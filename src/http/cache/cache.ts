const cacheName = 'ff-api-cache';

export const ApiCache = {
    async get(url: string): Promise<CacheValue | undefined> {
        const item = await (await apiCache()).match(url);
        if (!item) {
            return;
        }

        const headers = getHeadersObject(item.headers);
        const body = isStreamContent(headers) ? await item.arrayBuffer() : await item.json();
        return { body, headers };
    },

    async set(url: string, body: any, headers: HeaderObject) {
        body = isStreamContent(headers) ? body : JSON.stringify(body);
        try {
            return (await apiCache()).put(url, new Response(body, { headers }));
        } catch (error) {
            console.error(`error writing to api-cache for: ${url}. Maybe cache is full, resetting cache and trying again.`, error);
            await this.reset();
            return (await apiCache()).put(url, new Response(body, { headers }));
        }
    },

    async reset() {
        return caches.delete(cacheName);
    },
};

async function apiCache() {
    return await caches.open(cacheName);
}

function getHeadersObject(headers: Headers) {
    let result = {} as HeaderObject;
    headers.forEach((value, key) => (result[key] = value));
    return result;
}

function isStreamContent(headers: HeaderObject) {
    return headers['content-type']?.includes('-stream'); // e.g. application/octet-stream
}

export type HeaderObject = { [key: string]: string };
export type CacheValue = {
    body: any;
    headers: HeaderObject;
};
