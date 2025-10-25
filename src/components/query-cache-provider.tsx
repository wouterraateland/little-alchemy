"use client";

import QueryCacheContext from "components/query-cache-context";
import { queryCacheCreate } from "utils/query-cache";

let cache = queryCacheCreate();

export default function QueryCacheProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  if (typeof window === "undefined") cache = queryCacheCreate();
  return <QueryCacheContext value={cache}>{children}</QueryCacheContext>;
}
