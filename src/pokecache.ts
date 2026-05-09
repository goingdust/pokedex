export type CacheEntry<T> = {
    createdAt: number,
    val: T
}

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(millisecs: number) {
        this.#interval = millisecs;
        this.#startReapLoop();
    }

    add<T>(key: string, val: T | any) {
        this.#cache.set(key, {
            createdAt: Date.now(), val: val
        });
    }

    get<T>(key: string) {
        return this.#cache.get(key)?.val;
    }

    #reap() {
        this.#cache.forEach((entry, key) => {
            if (entry.createdAt < Date.now() - this.#interval) {
                this.#cache.delete(key);
            }
        })
    }

    #startReapLoop() {
        this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
    }

    stopReapLoop() {
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }
}