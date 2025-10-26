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
