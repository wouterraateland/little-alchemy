import QueryCacheContext from "components/query-cache-context";
import useStore from "hooks/use-store";
import { use } from "react";

const DEDUP_INTERVAL = 60000;

export function useQuery<T>(key: string, fetcher: () => Promise<T>): T {
  const queryCache = use(QueryCacheContext);
  const store = queryCache.get(key);
  const state = useStore(store);

  if (state.error) throw state.error;
  // Should revalidate
  if (state.loadedAt + DEDUP_INTERVAL <= Date.now()) {
    state.promise ??= new Promise((resolve, reject) =>
      fetcher().then(
        (data) => {
          store.set({
            data,
            error: null,
            loadedAt: Date.now(),
            promise: undefined,
          });
          resolve(data);
        },
        // eslint-disable-next-line @typescript-eslint/use-unknown-in-catch-callback-variable
        (error: Error) => {
          store.update((s) => ({ ...s, error, loadedAt: Date.now() }));
          reject(error);
        },
      ),
    );

    // eslint-disable-next-line @typescript-eslint/only-throw-error
    if (state.data === undefined) throw state.promise;
  }

  return state.data as T;
}
