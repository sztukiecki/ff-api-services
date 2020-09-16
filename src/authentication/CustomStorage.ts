import * as store from 'store';

/**
 * This storage can be used from node and other javascript products.
 * Read more about the storage here: https://aws-amplify.github.io/docs/js/authentication#managing-security-tokens
 */
export default class CustomStorage {
    // set item with the key
    static setItem(key: string, value: string): string {
        return store.set(key, value);
    }

    // get item with the key
    static getItem(key: string): string {
        return store.get(key);
    }

    // remove item with the key
    static removeItem(key: string): void {
        store.remove(key);
    }

    // clear out the storage
    static clear(): void {
        store.clear();
    }
}
