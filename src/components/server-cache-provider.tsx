"use client";

import QueryCacheContext from "components/query-cache-context";
import { createContext, use, useMemo } from "react";

export const ServerCacheContext = createContext<Record<string, unknown>>({});

export default function ServerCacheProvider({
  children,
  queries,
}: {
  children: React.ReactNode;
  queries: Record<string, unknown>;
}) {
  const queryCache = use(QueryCacheContext);
  const parentContext = use(ServerCacheContext);

  for (const [key, data] of Object.entries(queries)) {
    const store = queryCache.get(key);
    if (store.get().data === undefined)
      store.set({
        data,
        error: null,
        loadedAt: Date.now(),
        promise: undefined,
      });
  }

  const merged = useMemo(
    () => ({ ...parentContext, ...queries }),
    [parentContext, queries],
  );

  return <ServerCacheContext value={merged}>{children}</ServerCacheContext>;
}
