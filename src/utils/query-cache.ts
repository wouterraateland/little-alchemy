import { createCache } from "utils/caching";
import { createStore } from "utils/stores";

export const queryCacheCreate = () =>
  createCache(
    (key: string) => key,
    () =>
      createStore({
        data: undefined as unknown,
        error: null as Error | null,
        loadedAt: 0,
        promise: undefined as Promise<unknown> | undefined,
      }),
  );
export type QueryCache = ReturnType<typeof queryCacheCreate>;

export const queryCacheMutate = <T>(
  cache: QueryCache,
  key: string,
  update: (data: T | undefined) => T,
) => {
  cache.get(key).update((s) => ({
    ...s,
    data: update(s.data as T | undefined),
    loadedAt: Date.now(),
    error: null,
    promise: undefined,
  }));
};

export const queryCacheInvalidate = (
  cache: QueryCache,
  predicate: (key: string) => boolean,
) => {
  for (const [key, store] of Object.entries(cache.cache))
    if (predicate(key))
      store.update((s) => ({
        ...s,
        loadedAt: 0,
        data: store.subscriptions.size === 0 ? undefined : s.data,
      }));
};
