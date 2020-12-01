import * as store from 'store';

export interface CacheValue {
    etag: string;
    value: any;
}

const PREFIX = 'etag-cache-';

export class Cache {

    static get(uuid: string): CacheValue | undefined {
        return store.get(`${PREFIX}${uuid}`);
    }

    static set(uuid: string, etag: string, value: any) {
        return store.set(`${PREFIX}${uuid}`, { etag, value });
    }

    static reset() {
        store.each((value, key) => {
            if(key.startsWith(PREFIX)) {
                store.remove(key);
            }
        });
    }
}
